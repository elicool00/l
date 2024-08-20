<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function index(){
        if(!Auth::user() || !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        return Role::all();
    }

    public function show($id){
        if(!Auth::user() || !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $role = Role::find($id);
        if(!$role){
            return response(['status' => 'fail', 'message' => "Role not found!"], 404);
        }
        return $role;
    }

    public function getUsersByRoleId($id){
        if(!Auth::user() || !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        return User::where('role_id', $id)->get();
    }

    public function isAdmin($user = null){
        if(!$user){
            $user = Auth::user();
        }
        return $user->role_id == Role::where('title', 'ADMIN')->first()->id;
    }
}
