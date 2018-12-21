<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\OrderResource as OrderResource;
use Illuminate\Support\Facades\DB;

use App\Order;
use App\User;
use App\Item;
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
                return OrderResource::collection(DB::table('orders')
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    ->union(DB::table('orders')
                        ->whereRaw('(responsible_cook_id != ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                    ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                    ->paginate($request->input('rowsPerPage', 10)));
            }

            return OrderResource::collection(DB::table('orders')
                    ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                    ->union(DB::table('orders')
                        ->whereRaw('(responsible_cook_id != ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                    ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                    ->paginate($request->input('rowsPerPage', 10)));
        }
    }

    public function getOrderData(Request $request) {
        $id = $request->input('orderID');
        $itemID = DB::table('orders')->select('item_id')->where('id', $id)->get();

        return DB::table('items')->select('name')->where('id', $itemID[0]->item_id)->get();
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
