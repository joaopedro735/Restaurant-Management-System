<?php

namespace App\Http\Controllers;

use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\UserResource as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page'))  {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1) {
                return UserResource::collection(User::all());
            }
            return UserResource::collection(User::paginate($request->input('rowsPerPage', 10)));
        }
        elseif ($request->has('nmr'))  {
            return User::count();
        }
        else
        {
            return UserResource::collection(User::all());
        }
    }

    public function myProfile(Request $request)
    {
        return new UserResource($request->user());
    }
}
