<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $authcontroller = new AuthController;
        $response = $authcontroller->login($request);
        $res = json_decode($response->content());

        if($res->status == "success"){
            if(!$this->isAdmin()){
                $resWithCookie = $this->logout($request);
                return $resWithCookie->with('fail', "Access is forbidden!");
            }
            return redirect()->route('dashboard');
        }else{
            return back()->with('fail', "Credentail not matching");
        }
        
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $cookie = Cookie::forget('jwt');
        return redirect()->route('login.view')->withCookie($cookie);
    }

    public function isAdmin($user = null){
        if(!$user){
            $user = Auth::user();
        }
        return Auth::user()->role_id == Role::where('title', 'ADMIN')->first()->id;
    }

    public function sendResetLink(Request $request){
        $authcontroller = new AuthController;
        $response = $authcontroller->sendResetLink($request);
        $res = json_decode($response->content());
        
        if($res->status){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail', $res->message);
        }
    }

    public function dashboard(){
        $admin_id = Role::where('title', 'ADMIN')->first()->id;
        $user_id = Role::where('title', 'USER')->first()->id;
        $admins = User::where('role_id', $admin_id)->get();
        $users = User::where('role_id', $user_id)->get();

        $today_reg = User::whereDate('created_at', Carbon::today())->get();
        $week_reg = $this->weekRegInfo();
        $year_info = $this->yearRegInfo();

        return view('dashboard', [
            'admins' => count($admins), 
            'users' => count($users), 
            'today_reg' => count($today_reg),
            'week_reg' => $week_reg,
            'year_info' => $year_info
        ]);
    }

    private function weekRegInfo(){
        $week_info = array();
        for ($i = 0; $i < 7; $i++) {
            $week_day = date('Y-m-d H:i:s', strtotime(Carbon::now()->startOfWeek() . ' + ' . $i .' days'));
            
            array_push($week_info, [$i+1, count(User::whereDate('created_at', $week_day)->get())]);
        }
        return $week_info;
    }

    private function yearRegInfo(){
        $year_info = array();
        for ($i=1; $i <= 12; $i++) {
            array_push($year_info, [$i, count(User::whereYear('created_at', Carbon::now()->year)->whereMonth('created_at', $i)->get())]);
        }
        return $year_info;
    }
}