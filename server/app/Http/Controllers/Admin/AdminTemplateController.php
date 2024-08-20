<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminTemplateController extends Controller
{
    public function index(){
        return view('Templates.templates', ['templates' => Template::where('type', 'default')->get()]);
    }

    public function create(){
        return view('Templates.create');
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'view' => "required",
            'thumbnail' => "required"
        ]);
        if($validator->failed()){
            return back(400)->with('fail-arr', $validator->errors()->toArray());
        }

        $path = 'templates/' . Auth::id() . "/" . $request->name . "/"; // . ".blade.php";
        $i = 1;
        while(Storage::disk('public')->exists($path)) {
            $path = 'templates/' . Auth::id() . "/" . $request->name . "(" . $i . ")/"; // . ".blade.php";
            $i++;
        }
        //upload assets
        $this->uploadAssets($request->file('assets'), $path);
        //thumbnail
        $thumbnail_name = $request->file('thumbnail')->getClientOriginalName();
        $request->file('thumbnail')->store('public');
        $request->file('thumbnail')->move(public_path('storage/' . $path), $thumbnail_name);
        //generate html and blade files
        preg_match_all('/src="([^"]+)"/', $request->view, $matches);
        $i = 1;
        $blade = $request->view;
        $html = $request->view;
        foreach($matches[1] as $match){
            $html = str_replace($match, asset('storage/' . $path . $i . '.png'), $html);
            $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$path}{$i}.png\"))}}", $blade);
            $i++;
        }
        //html, blade
        $html_storage = Storage::disk('public')->put($path . "/" . $request->name . ".html", $html);
        $blade_storage = Storage::disk('public')->put($path . "/" . $request->name . ".blade.php", $blade);

        $template = Template::create([
            'name' => $request->name,
            'type' => 'default',
            'html' => $request->name . ".html",
            'blade' => $request->name . ".blade.php",
            'author_id' => Auth::id(),
            'path' => $path,
            'thumbnail' => asset('storage/' . $path . $thumbnail_name),
        ]);

        if($template){
            return back()->with('success', 'Default template created successfully!');
        }
        return back()->with('fail', 'Something went wrong! Please try again.');
    }

    public function edit($id){
        $template = Template::find($id);
        if(!$template){
            return back()->with('fail', 'Template not found!');
        }
        $html = file_get_contents(public_path('storage/' . $template->path . $template->html));
        return view('Templates.edit', ['template' => $template, 'html' => $html]);
    }

    public function update(Request $request, $id){
        $template = Template::find($id);
        if(!$template){
            return back()->with('fail', 'Template not found!');
        }
        if($request->file('assets')){
            $this->uploadAssets($request->file('assets'), $template->path);
        }
        preg_match_all('/src="([^"]+)"/', $request->view, $matches);
        $i = 1;
        $blade = $request->view;
        $html = $request->view;
        foreach($matches[1] as $match){
            $html = str_replace($match, asset('storage/' . $template->path . $i . '.png'), $html);
            $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$template->path}{$i}.png\"))}}", $blade);
            $i++;
        }
        //html, blade
        $html_storage = Storage::disk('public')->put($template->path . "/" . $template->name . ".html", $html);
        $blade_storage = Storage::disk('public')->put($template->path . "/" . $template->name . ".blade.php", $blade);
        if($request->file('thumbnail')){
            //thumbnail
            $thumbnail_name = $request->file('thumbnail')->getClientOriginalName();
            $request->file('thumbnail')->store('public');
            $request->file('thumbnail')->move(public_path('storage/' . $template->path), $thumbnail_name);
        }
        $template->update([
            'name' => ($request->name) ? ($request->name) : ($template->name),
            'thumbnail' => ($request->file('thumbnail')) ? (asset('storage/' . $template->path . $thumbnail_name)) : ($template->thumbnail)
        ]);
        return back()->with('success', 'Default template Updated successfully!');
    }

    public function destroy($id){
        $template = Template::find($id);
        if(!$template){
            return back()->with('fail', 'Template not found!');
        }
        Storage::disk('public')->deleteDirectory($template->path);
        $template->delete();
        return back()->with('success', 'Template deleted successfully!');
    } 

    private function uploadAssets($assets, $path){
        $dir = public_path('storage/' . $path);
        if($assets){
            $i = 1;
            foreach($assets as $item){
                $item2 = $item->store('public');
                $item->move($dir, $i . '.png');
                $i++;
            }
        }
    }
}
