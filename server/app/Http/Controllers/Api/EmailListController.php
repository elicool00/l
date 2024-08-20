<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Email;
use App\Models\EmailList;
use App\Models\EmailSender;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmailListController extends Controller
{
    public function index(){
        //auth user's lists
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        return response(['status' => 'success', 'message' => EmailList::where('author_id', Auth::id())->get()]);
    }

    public function show($id){
        //show user's email list
        $list = EmailList::find($id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        return response(['status' => 'success', 'message' => $list]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $list = EmailList::create([
            'name' => $request->name,
            'description' => $request->description,
            'author_id' => Auth::id()
        ]);

        if($list){
            //create activity or notification!!!!!!
            //####//
            return response(['status' => 'success', 'message' => 'An email list has been created!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wrong! Please try again.'], 400);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'string'
        ]);
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $list = EmailList::find($id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $list->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return response(['status' => 'success', 'message' => 'An email list has been updated!']);        
    }

    public function destroy(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $list = EmailList::find($id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        if(Hash::check($request->password, Auth::user()->password)){
            //pause mailers with this list
            $mailers = EmailSender::where('list_id', $list->id)->get();
            foreach($mailers as $mailer){
                $mailer->update(['status' => 'stopped']);
            }
            //delete list emails
            Email::where('list_id', $list->id)->delete();
            $list->delete();
            return response(['status' => 'success', 'message' => 'An email list has been deleted!']); 
        }
        return response(['status' => 'fail', 'message' => 'Password incorrect!'], Response::HTTP_FORBIDDEN);    
    }

    private function is_author($list){
        if($list->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
