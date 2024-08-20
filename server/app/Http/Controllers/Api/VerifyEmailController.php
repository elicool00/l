<?php

namespace App\Http\Controllers\Api;

use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Notifications\SendVerification;
use Illuminate\Support\Facades\Validator;

class VerifyEmailController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return redirect(env('FRONT_URL') . '/email/verify/success');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect(env('FRONT_URL') . '/email/verify/success');
    }

    function resendVerification(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);
        if($validator->fails()){
            return response(["status" => "fail-arr", "message" => $validator->errors()->toArray()], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->notify(new SendVerification($user));
        return response(['status' => "success", "message" => "Verification link sent!"]);
    }
}
