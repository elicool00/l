<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailSender;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TemplateController extends Controller
{

    public function index(){
        $templates = Template::where('type', 'default')->get();
        foreach($templates as $template){
            $template->view = file_get_contents(public_path('storage/' . $template->path . $template->html));
        }
        return response(['status' => 'success', 'message' => $templates]);
    }

    public function userTemplates(){
        //auth user templates
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        return response(['status' => 'success', 'message' => Template::where('author_id', Auth::id())->get()]);
    }

    public function show($id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $html = file_get_contents(public_path('storage/' . $template->path . $template->html));
        return response(['status' => 'success', 'message' => $template, 'html' => $html]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'default_id' => "required|integer",
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $default = Template::find($request->default_id);
        if(!$default){
            return response(['status' => 'fail', 'message' => 'Default template not found!'], Response::HTTP_NOT_FOUND);
        }

        $name = ($request->name) ? ($request->name) : ($default->name);
        $path = 'templates/' . Auth::id() . "/" . $name. "/";
        $i = 1;
        while(Storage::disk('public')->exists($path)) {
            $path = 'templates/' . Auth::id() . "/" . $name . "(" . $i . ")/";
            $i++;
        }

        //copy default dir content to $path
        $default_files = Storage::disk('public')->allFiles($default->path);
        foreach($default_files as $file){
            $filename = pathinfo($file)['basename'];
            Storage::disk('public')->copy($file, $path . $filename);
        }
        //change assets links
        $view = file_get_contents(public_path('storage/' . $default->path . $default->html));
        preg_match_all('/src="([^"]+)"/', $view, $matches);
        $i = 1;
        $blade = $view;
        $html = $view;
        foreach($matches[1] as $match){
            $html = str_replace($match, asset('storage/' . $path . $i . '.png'), $html);
            $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$path}{$i}.png\"))}}", $blade);
            $i++;
        }
        $html_storage = Storage::disk('public')->put($path . $default->html, $html);
        $blade_storage = Storage::disk('public')->put($path . $default->blade, $blade);

        $template = Template::create([
            'name' => $name,
            'path'=> $path,
            'html' => $default->html,
            'blade' => $default->blade,
            'author_id' => Auth::id(),
            'thumbnail' => $default->thumbnail,
        ]);
        if($template){
            return response(['status' => 'success', 'message' => 'Template created successfully!', 'id' => $template->id]);
        }
    }

    public function update(Request $request, $id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        // return $request->assets_c;
        if($request->file('assets')){
            $this->uploadAssets($request->file('assets'), $template->path, $request->assets_c);
        }
        //html, blade
        if($request->view){
            $blade = $request->view;
            $html = $request->view;
            //text changes
            if($request->textChanges){
                foreach(json_decode($request->textChanges) as $change){
                    if($change[0] !== $change[1]){
                        $html = $this->str_replace_first($change[0], $change[1], $html);
                        $blade = $this->str_replace_first($change[0], $change[1], $blade);
                    }
                }
            }
            //link chnages
            if($request->linkChanges){
                foreach(json_decode($request->linkChanges) as $change){
                    if($change[0] !== $change[4]){
                        // return $change;
                        $html = $this->str_replace_first($change[4], $change[0], $html);
                        $blade = $this->str_replace_first($change[4], $change[0], $blade);
                    }
                    if($change[2] !== $change[5]){
                        $html = $this->str_replace_first($change[5], $change[2], $html);
                        $blade = $this->str_replace_first($change[5], $change[2], $blade);
                    }
                }
            }
            //images in html
            preg_match_all('/src="([^"]+)"/', $html, $matches);
            $i = 1;
            foreach($matches[1] as $match){
                $html = str_replace($match, asset('storage/' . $template->path . $i . '.png'), $html);
                $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$template->path}{$i}.png\"))}}", $blade);
                $i++;
            }
            //imgae in blade
            $html_storage = Storage::disk('public')->put($template->path . $template->html, $html);
            $blade_storage = Storage::disk('public')->put($template->path . $template->blade, $blade); 
        }
        $template->update([
            'name' => ($request->name) ? ($request->name) : ($template->name),
        ]);
        return response(['status' => 'success', 'message' => 'Template updated successfully!']);
    }

    public function destroy(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        if(Hash::check($request->password, Auth::user()->password)){
            //pause mailers with this template
            $mailers = EmailSender::where('template_id', $template->id)->get();
            foreach($mailers as $mailer){
                $mailer->update(['status' => 'stopped']);
            }
            Storage::disk('public')->deleteDirectory($template->path);
            $template->delete();
            return response(['status' => 'success', 'message' => 'Template deleted successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Password incorrect!'], Response::HTTP_FORBIDDEN);
    }

    private function uploadAssets($assets, $path, $positions){
        $dir = public_path('storage/' . $path);
        if($assets){
            for($i = 0; $i < count($assets); $i++){
                $assets[$i]->store('public');
                $p = $positions[$i];
                $assets[$i]->move($dir, $p . '.png');
            }
        }
    }

    private function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }

    private function str_replace_first($search, $replace, $subject)
    {
        $search = '/'.preg_quote($search, '/').'/';
        return preg_replace($search, $replace, $subject, 1);
    }
}
