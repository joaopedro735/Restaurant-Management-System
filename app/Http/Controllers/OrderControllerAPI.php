<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\DB;

use App\Order;
use App\User;
use App\StoreUserRequest;
use Hash;

class OrderControllerAPI extends Controller
{
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
                    ->paginate($request->input('rowsPerPage', 10))
                );
            }

            return OrderResource::collection(DB::table('orders')
                ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                ->union(DB::table('orders')
                    ->whereRaw('(responsible_cook_id != ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                ->paginate($request->input('rowsPerPage', 10))
            );
        }
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
}
