<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderResourceMeal;
use App\Meal;
use App\Order;
use App\User;
use Auth;
use Illuminate\Http\Request;
use Debugbar;

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

        if ($request->has('page')) {
            /*return OrderResource::collection(DB::table('orders')
                ->whereRaw('responsible_cook_id = ? AND (state = "in preparation" OR state = "confirmed")', $user->id)
                ->union(DB::table('orders')
                    ->whereRaw('(responsible_cook_id <> ? OR responsible_cook_id IS NULL) AND state = "confirmed"', $user->id))
                ->orderByRaw("FIELD(responsible_cook_id, '$user->id') desc, responsible_cook_id is NULL desc, state desc, created_at asc")
                ->paginate($request->input('rowsPerPage', 10))
            );*/
            return OrderResource::collection(Order::where('responsible_cook_id', $id)
                ->WhereIn('state', ['in preparation', 'confirmed'])
                ->orWhereNull('responsible_cook_id')
                ->where('state', 'confirmed')
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

    public function waiterActive(Request $request)
    {
        $userID = Auth::guard('api')->user()->id;
        $activeMeals = Meal::where('responsible_waiter_id', $userID)->where('state', 'active')->select('id')->get();
        return OrderResourceMeal::collection(Order::whereIn('meal_id', $activeMeals)
            ->whereIn('state', ['pending', 'confirmed'])
            ->orderBy('state', 'asc')
            ->paginate($request->input('rowsPerPage', 10)));
    }

    public function waiterPrepared(Request $request)
    {
        $userID = Auth::guard('api')->user()->id;
        $activeMeals = Meal::where('responsible_waiter_id', $userID)->where('state', 'active')->select('id')->get();
        return OrderResourceMeal::collection(Order::whereIn('meal_id', $activeMeals)
            ->where('state', 'prepared')
            ->paginate($request->input('rowsPerPage', 10)));
    }

    public function deliverOrder(Request $request, $orderID) {
        $order = Order::find($orderID);
        $userID = Auth::guard('api')->user()->id;
        if ($order->meal->responsible_waiter_id !== $userID) {
            return response()->json([
                'message' => "Unable to deliver another user's order"
            ], 400);
        }

        if ($order->state !== 'prepared') {
            return response()->json([
                'message' => "Unable to deliver an unprepared order"
            ], 400);
        }

        $order->state = 'delivered';
        $order->save();
        return response()->json([
            'message' => "Order delivered successfully"
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'state' => 'in:confirmed,in preparation,prepared'
        ]);

        $order->update($request->all());

        /* return new OrderResource($order); */
        return response()->json([
            'message' => $request->input('state') == 'prepared' ? 'Order completed' : 'Order updated'
        ], 200);
    }

    public function confirm(Request $request)
    {
        foreach ($request->input('orders') as $order) {
            $order = Order::findOrFail($order);
            Debugbar::info($order);
            Debugbar::info('Found order');
            
            $order->state = "confirmed";
            $order->save();
        }

        return response()->json([
            'message' => count($request->input('orders')) > 1 ? 'Orders confirmed' : 'Order confirmed'
        ], 200);
    }

    public function delete($id) {
        $order = Order::findOrFail($id);
        
        $order->delete();

        return response()->json([
            'message' => 'Orders deleted'
        ], 200);
    }

    public static function canDeleteItem($id)
    {
        $order = Order::where('item_id', $id)->first();

        return $order ? false : true;
    }

    public static function canDeleteuser($id)
    {
        $user = Order::where('responsible_cook_id', $id)->first();

        return $user ? false : true;
    }
}
