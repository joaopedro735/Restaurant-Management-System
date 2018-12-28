<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\OrderResource;

use App\Order;
use App\User;
//use App\StoreUserRequest;
use Hash;

class OrderControllerAPI extends Controller
{
    public function index(Request $request)
    {
        $id = $request->input('cookID');
        $user = User::find($id);

        if ($user === null) {
            return response()->json([
                "message" => "User not found",
            ], 404);
        }
//        $user = \Auth::guard('api')->user();
//        $null = null;

        if ($request->has('page'))
        {
            /*return OrderResource::collection(DB::table('orders')
                ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                ->union(DB::table('orders')
                    ->whereRaw('(responsible_cook_id <> ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                ->paginate($request->input('rowsPerPage', 10))
            );*/
            return OrderResource::collection(Order::where('responsible_cook_id', $id)
                ->WhereIn('state', ['in preparation', 'confirmed'])
                ->orWhere('state', 'confirmed')
                ->orWhereNull('responsible_cook_id')
                ->orderByRaw('FIELD(responsible_cook_id, ?) desc', $id)
                ->orderByRaw('responsible_cook_id is NULL desc')
                ->orderBy('state', 'desc')
                ->orderBy('created_at', 'asc')
                ->paginate($request->input('rowsPerPage', 10)));
        }
        
        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'state' => 'in:confirmed,in preparation,prepared'
        ]);

        $order->update($request->all());

        return new OrderResource($order);
    }

    public static function canDeleteItem($id) {
        $order = Order::where('item_id', $id)->first();

        return $order ? false : true;
    }
}
