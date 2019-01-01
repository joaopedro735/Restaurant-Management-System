<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use App\Notifications\PasswordResetSuccess;
use App\Notifications\UserRegisteredSuccessfully;
use App\PasswordReset;
use Auth;
use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
use App\Http\Resources\UserResource as UserResource;
use Illuminate\Support\Facades\DB;
use App\User;
use App\StoreUserRequest;
use Hash;
use Illuminate\Validation\Rule;

class UserControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page')) {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1) {
                return UserResource::collection(User::all());
            }
            return UserResource::collection(User::paginate($request->input('rowsPerPage', 15)));
        } else {
            return UserResource::collection(User::all());
        }
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'type'     => ['required', Rule::in(["manager", "cook", "waiter", "cashier"])],
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

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $canDeleteUser = MealControllerAPI::canDeleteUser($id) && OrderControllerAPI::canDeleteUser($id);

        $canDeleteUser ? $user->forceDelete() : $user->delete();

        return response()->json(null, 204);
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

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string|confirmed',
        ]);
        //$user = User::where('email', $request->email)->first();
        $user = Auth::guard('api')->user();
        if (!$user)
            return response()->json([
                'message' => 'We cant find a user with that e-mail address.'
            ], 404);
        $check  = Auth::guard('web')->attempt([
            'email' => $user->email,
            'password' => $request->old_password,
        ]);

        if ($check) {
            $user->password = bcrypt($request->new_password);
            $user->token()->revoke();
            $user->token()->delete();
            $token = $user->createToken('newToken')->accessToken;
            $user->save();
            return json_encode(array('token' => $token));
        }
        return response()->json([
            'message' => 'Current password incorrect.'
        ], 404);
    }

    public function myProfile(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * @deprecated
     */
    public static function getCookName($id) { 
        if ($id == null) {
            return 'No cook assigned';
        }

        return DB::table('users')->select('name')->where('id', $id)->first()->name;
    }

    /**
     * @deprecated
     */
    public static function getCookID($id) {
        if ($id == null) {
            return 0;
        }

        return $id;
    }

    public static function getWaiterName($id) {
        return DB::table('users')->select('name')->where('id', $id)->first()->name;
    }

    public function save(Request $request)
    {
        //\Debugbar::info($request);
        $user = User::where('email', $request->input('email'))->first();
        if ($request->has('username') && !empty($request->input('username')))
            $user->username = $request->input('username');
        if ($request->has('name') && !empty($request->input('name')))
            $user->name = $request->input('name');
        if ($request->has('photo_url') && !empty($request->input('photo_url')))
            $user->photo_url = $request->input('photo_url');
        $user->save();
        return new UserResource($request->user());
    }

    public function blockUser($id) {
        $user = User::findOrFail($id);

        $user->blocked = 1;
        $user->save();

        return new UserResource($user);
    }

    public function unblockUser($id) {
        $user = User::findOrFail($id);

        $user->blocked = 0;
        $user->save();

        return new UserResource($user);
    }
}
