<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Email;
use App\Models\EmailList;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

class EmailController extends Controller
{
    public function index($list_id){
        //get emails of list
        $list = EmailList::find($list_id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $emails = Email::where(['list_id' => $list_id, 'author_id' => $list->author_id])->get();
        
        try {
            foreach($emails as $email){
                $email->email = Crypt::decryptString($email->email);
            }            
        } catch (DecryptException $e) {
            return response(['status' => 'fail', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
        return response(['status' => 'success', 'message' => $emails]);
    }

    public function store(Request $request, $list_id){
        //append email(s) to list
        $list = EmailList::find($list_id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'email' => 'required|array',
        ]);
        if($validator->failed()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        //check if email exist
        foreach($request->email as $e){
            $list_emails = Email::where('list_id', $list->id)->get();
            $exists = false;
            foreach($list_emails as $email){
                if($e === Crypt::decryptString($email->email)){
                    $exists = true;
                    break;
                }
            }
            if(!$exists){
                $email = Email::create([
                    'email' => Crypt::encryptString($e),
                    'list_id' => $list->id,
                    'author_id' => Auth::id(),
                    'tag' => $request->tag
                ]); 
            }
        }
        return response(['status' => 'success', 'message' => 'Email(s) added to ' . $list->name . ' successfully!']);
    }

    public function update(Request $request, $id){
        //update an email in a list
        $email = Email::find($id);
        if(!$email){
            return response(['status' => 'fail', 'message' => 'Email contact not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($email)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'email' => 'email',
        ]);
        if($validator->failed()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $email->update([
            'email' => $request->email
        ]);
        return response(['status' => 'success', 'message' => 'Email updated successfully!']);
    }

    public function destroy($id){
        //delete email in list
        $email = Email::find($id);
        if(!$email){
            return response(['status' => 'fail', 'message' => 'Email contact not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($email)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $email->delete();
        return response(['status' => 'success', 'message' => 'Email deleted successfully!']);
    }

    public function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
