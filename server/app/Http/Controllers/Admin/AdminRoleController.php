<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Roles.roles', ['roles' => Role::all()]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:roles',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }

        $role = Role::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        if($role){
            return back()->with('success', 'Role created successfully!');
        }
        return back()->with('fail', 'Something went wrong! Tru again.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if(!$role) return back()->with('fail', 'Role not found!');

        $role->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        return back()->with('success', 'Role updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::find($id);
        if(!$role) return back()->with('fail', 'Role not found!');

        $role->delete();
        return back()->with('success', 'Role deleted successfully!');
    }
}
