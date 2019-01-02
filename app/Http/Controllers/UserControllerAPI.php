<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource as UserResource;
use App\Notifications\PasswordResetSuccess;
use App\Notifications\UserRegisteredSuccessfully;
use App\PasswordReset;
use App\StoreUserRequest;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;


class UserControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page')) {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1) {
                return UserResource::collection(User::all());
            }
            return UserResource::collection(User::paginate($request->input('rowsPerPage', 10)));
        } else {
            return UserResource::collection(User::all());
        }
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'type' => ['required', Rule::in(["manager", "cook", "waiter", "cashier"])],
        ]);
        $user = new User($validatedData);
        $user->blocked = 1;
        $user->password = str_random(60);
        $user->save();

        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        if ($user && $passwordReset)
            $user->notify(
                new UserRegisteredSuccessfully($user, $passwordReset->token)
            );
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ]);
        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();
        if (!$passwordReset)
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);
        $user = User::where('email', $passwordReset->email)->first();
        if (!$user)
            return response()->json([
                'message' => 'We cant find a user with that e-mail address.'
            ], 404);
        $user->password = bcrypt($request->password);
        $user->blocked = 0;
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));
        return response()->json($user);
    }

    public function myProfile(Request $request)
    {
        return new UserResource($request->user());
/*        return User::where('email', $request->input('email'))->first();*/
    }

    public static function getCookName($id)
    {
        if ($id == null) {
            return 'No cook assigned';
        }

        return DB::table('users')->select('name')->where('id', $id)->first()->name;
    }

    public static function getCookID($id)
    {
        if ($id == null) {
            return 0;
        }

        return $id;
    }

    public function save(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if ($request->has('username') && !empty($request->input('username')))
            $user->username = $request->input('username');
        if ($request->has('name') && !empty($request->input('name')))
            $user->name = $request->input('name');
        if ($request->has('photo_url') && !empty($request->input('photo_url')))
            $user->photo_url = $request->input('photo_url');
        $user->save();
        return new UserResource($user);
    }

    public function isWorking(Request $request)
    {
        $user = \Auth::guard('api')->user();
        return $user->shift_active;
    }

    public function startWorking(Request $request){
        $user = \Auth::guard('api')->user();
        //shift active muda
        $user->shift_active = 1;
        //data muda
        $user->last_shift_start = Carbon::now();
        $user->save();
        return new UserResource($user);
    }

    public function stopWorking(){
        $user = \Auth::guard('api')->user();
        //shift active muda
        $user->shift_active = 0;
        //data muda
        $user->last_shift_end = Carbon::now();
        $user->save();
        return new UserResource($user);
    }
}
