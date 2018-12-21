<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\OrderResource as OrderResource;
use Illuminate\Support\Facades\DB;

use App\Order;
use App\User;
use App\StoreUserRequest;
use Hash;

class OrderControllerAPI extends Controller
{
    /* public function index(Request $request)
    {
        $id = $request->input('cookID');
        $user = User::find($id);

        if ($request->has('page'))
        {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1)
            {
                return OrderResource::collection($user->orders()
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    ->orderByRaw('state desc, created_at asc')
                    ->all());
            }

            //return OrderResource::collection($user->orders()->paginate(10));
            return OrderResource::collection($user->orders()
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    ->orderByRaw('state desc, created_at asc')
                    ->paginate(10));
        }
        elseif ($request->has('nmr'))
        {
            return $user->orders()
            ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
            ->count();
        }
        else
        {
            return $user->orders()->count();
        }
    } */

    public function index(Request $request)
    {
        $id = $request->input('cookID');
        $user = User::find($id);
        $null = null;

        if ($request->has('page'))
        {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1)
            {
                return OrderResource::collection($user->orders()
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    ->orderByRaw('state desc, created_at asc')
                    ->get());
            }

            return OrderResource::collection(DB::table('orders')
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    /* ->orderByRaw('state desc, created_at asc') */
                    ->union(DB::table('orders')
                        ->whereRaw('(responsible_cook_id != ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                    ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                    ->paginate(10));

            /* return OrderResource::collection(DB::table('orders')
                    ->whereRaw('responsible_cook_id != ? AND state = "confirmed"', $user->id)
                    ->orderByRaw('state desc, created_at asc')
                    ->union(DB::table('orders')
                        ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id))
                    ->paginate(10)); */
        }
        elseif ($request->has('nmr'))
        {
            return (DB::table('orders')
            ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
            ->union(DB::table('orders')
                ->whereRaw('(responsible_cook_id != ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
            /* ->union(DB::table('orders')
                ->whereRaw('responsible_cook_id IS NULL AND state = "confirmed"')) */
            ->count());
            /* $cookOrdersInPrepAndConfCount = $user->orders()
            ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
            ->count();

            $allConfOrdersCount = DB::table('orders')
            ->whereRaw('responsible_cook_id != ? AND state = "confirmed"', $user->id)
            ->count();

            $nullCookOrderCount = DB::table('orders')
            ->whereRaw('responsible_cook_id IS NULL AND state = "confirmed"')
            ->count();

            return ($cookOrdersInPrepAndConfCount + $allConfOrdersCount + $nullCookOrderCount); */
        }
        else
        {
            return $user->orders()->count();
        }
    }

    public static function getCookName($id) {
        if ($id == null) {
            return 'No cook assigned';
        }

        return DB::table('users')->select('name')->where('id', $id)->first()->name;
    }

    public static function getCookID($id) {
        if ($id == null) {
            return 0;
        }

        return $id;
    }

    public static function timestampToString($timestamp) {
        return mb_convert_encoding($timestamp, "UTF-8");;
    }
}
