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
    public function index(Request $request)
    {
        if ($request->has('page'))
        {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1)
            {
                return OrderResource::collection(Order::all());
                /* return OrderResource::collection(DB::table('orders')->where('responsible_cook_id', $request->cook_id)); */
            }

            return OrderResource::collection(Order::paginate($request->input('rowsPerPage', 10)));
        }
        elseif ($request->has('nmr'))
        {
            return Order::count();
        }
        else
        {
            return OrderResource::collection(Order::all());
            /* return OrderResource::collection(DB::table('orders')->where('responsible_cook_id', $request->cook_id)); */
        }
    }

    public static function getCookName($id) {
        //return User::findOrFail($id);
        return DB::table('users')->select('name')->where('id', '=', $id)->first();
        /* $user = User::where('id', $id)->first();
        echo $user->name;

        return $user->name; */
    }

    public static function timestampToString($timestamp) {
        $utf8_timestamp = mb_convert_encoding($timestamp, "UTF-8");

        //$jsonString = json_decode($utf8_timestamp, true);        
        // return $jsonString['date'] == null ? $utf8_timestamp : $jsonString;

        //$date = date_create_from_format('Y-m-d H:i:s', $utf8_timestamp); 
        //return $date->format('H:i:s (d-M-Y)');

        return $utf8_timestamp;
    }
}
