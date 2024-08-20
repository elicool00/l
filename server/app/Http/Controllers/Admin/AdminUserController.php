<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Notifications\NotifyUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Str;

class AdminUserController extends Controller
{
    public function index(){
        $admin_id = Role::where('title', 'ADMIN')->first()->id;
        $user_id = Role::where('title', 'USER')->first()->id;
        $users = User::where('role_id', $user_id)->orderBy('created_at', 'desc')->simplePaginate(25);
        $admins = User::where('role_id', $admin_id)->orderBy('created_at', 'desc')->get();

        return view('Users.users', ['users' => $users, 'admins' => $admins, 'roles' => Role::orderBy('id', 'desc')->get()]);
    }

    public function show($id){
        $user = User::find($id);
        if(!$user){
            return back()->with('fail', 'User not found!');
        }        
        return view('Users.profile', ['user' => $user]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|between:5,20',
            'full_name' => 'required|string|between:5,30',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }

        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => ($request->role_id) ? ($request->role_id) : (Role::where('title', 'USER')->first()->id),
            'profile_picture' => config('app.default_profile_picture.path').substr($request->username, 0, 2).config('app.default_profile_picture.background'),
        ]);
        //send verification email
        //##?//
        if($user){
            return back()->with('success', 'New user created successfully!');
        }
        return back()->with('fail', 'Something went wrong! Try again.');
    }

    public function update(Request $request, $id){
        $userController = new UserController;
        $response = $userController->update($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function UpdateAvatar(Request $request, $id){
        $userController = new UserController;
        $response = $userController->update($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', 'User avatar updated!');
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function updatePassword(Request $request, $id){
        $userController = new UserController;
        $response = $userController->updatePassword($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            if($id == Auth::id()){
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                $cookie = Cookie::forget('jwt');
                return redirect()->route('login.view')->withCookie($cookie)->with('success', $res->message);
            }
            // return back()->with();
        }else if($res->status == "fail-arr"){
            return back()->with('fail-arr', $res->message);
        }else{
            return back()->with('fail', $res->message);
        }
    }
    public function setDefaultAvatar($id){
        $userController = new UserController;
        $response = $userController->setDefaultAvatar($id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function destroy($id){
        $userController = new UserController;
        $response = $userController->destroy($id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function notify(Request $request){
        $validator = Validator::make($request->all(), [
            'subject' => "required|string",
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }
        $data = [
            'subject' => $request->subject,
            'title' => $request->title,
            'text_1' => $request->text1,
            'text_2' => $request->text2,
            'btn_text' => $request->btn_text,
            'url' => $request->url,
            'text_3' => $request->text3,
        ];
        foreach(User::all() as $user){
            $data['user'] = $user;
            if(!$data['title']){
                $data['title'] = "Welcome " . $user->username . "!";
            }
            $user->notify(new NotifyUsers($data));
        }
        return back()->with('success', 'Notifaction has been sent');
    }

    public function notifySingle(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'subject' => "required|string",
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }
        $user = User::find($id);
        if(!$user){
            return back()->with('fail', 'User not found!');
        }

        $data = [
            'subject' => $request->subject,
            'title' => $request->title,
            'text_1' => $request->text1,
            'text_2' => $request->text2,
            'btn_text' => $request->btn_text,
            'url' => $request->url,
            'text_3' => $request->text3,
            'user' => $user,
        ];
        
        if(!$data['title']){
            $data['title'] = "Welcome " . $user->username . "!";
        }
        $user->notify(new NotifyUsers($data));
        
        return back()->with('success', 'Notifaction has been sent to ' . $user->username);
    }
}
