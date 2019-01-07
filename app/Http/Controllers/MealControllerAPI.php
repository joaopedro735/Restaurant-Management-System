<?php

namespace App\Http\Controllers;

use App\Http\Resources\MealResource;
use App\Http\Resources\MealsResource;
use App\Invoice;
use App\Item;
use App\Meal;
use App\Order;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MealControllerAPI extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return MealsResource::collection(Meal::paginate(10));
    }

    public function active(Request $request)
    {
        return MealsResource::collection(Meal::where('responsible_waiter_id', Auth::guard('api')->user()->id)
            ->where('state', 'active')
            ->paginate($request->input('rowsPerPage', 10)));
    }

    public function mealHasPendingOrders(Request $request, $mealID)
    {
        $meal = Meal::findOrFail($mealID);
        $count = 0;
        foreach ($meal->orders as $order) {
            if ($order->state !== 'delivered') {
                $count++;
            }
        }
        return response()->json([
            "pendingCount" => $count
        ]);
    }

    public function terminateMeal(Request $request, $mealID)
    {
        $meal = Meal::findOrFail($mealID);
        $userID = Auth::guard('api')->user()->id;
        if ($meal->state === 'terminated') {
            return response()->json([
                'message' => "Meal already terminated"
            ], 400);
        }
        if ($meal->responsible_waiter_id !== $userID) {
            return response()->json([
                'message' => "Unable to terminate another waiter's meal"
            ], 400);
        }
        $priceSum = 0.0;
        foreach ($meal->orders as $order) {
            if ($order->state !== "delivered") {
                $priceSum += $order->item->price;
                $order->state = "not delivered";
                $order->save();
            }
        }
        $meal->total_price_preview -= $priceSum;
        $meal->state = "terminated";
        $meal->save();

        $this->generateInvoice($meal);

        return response()->json([
            "message" => "Meal terminated successfully"
        ]);
    }

    public function generateInvoice(Meal $meal)
    {
        /*$meal = Meal::findOrFail($mealID);*/
        $orders = json_decode($meal->orders->where('state', 'delivered'));
        $items_quantity = array_count_values(array_column($orders, 'item_id'));

        $invoice = new Invoice();
        $invoice->state = "pending";
        $invoice->meal_id = $meal->id;
        $invoice->date = Carbon::today();
        $invoice->total_price = $meal->total_price_preview;
        $invoice->save();

        foreach ($items_quantity as $item => $quantity) {
            $i = Item::findOrFail($item);
            /*$itemInvoice = new InvoiceItem;
            $itemInvoice->quantity = $quantity;
            $itemInvoice->unit_price = $i->price;
            $itemInvoice->sub_total_price = $quantity * $i->price;*/
            $invoice->items()->attach($i->id, [
                'quantity' => $quantity,
                'unit_price' => $i->price,
                'sub_total_price' => $quantity * $i->price
            ]);
        }

        return;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return Meal
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'table_number' => 'required|integer|exists:restaurant_tables,table_number',
        ]);
        $isTableActive = Meal::where('table_number', ($request->input('table_number')))->where('state', 'active')->count();

        if ($isTableActive != 0) {
            return response()->json([
                'message' => 'Table already has an active meal.'
            ], 400);
        }
        $meal = new Meal;
        $meal->responsible_waiter_id = Auth::guard('api')->user()->id;
        $meal->table_number = $request->input('table_number');
        $meal->state = 'active';
        $meal->start = Carbon::now();
        $meal->save();
        return $meal;
    }

    public function addOrderToMeal(Request $request, $mealID)
    {
        $meal = Meal::findOrFail($mealID);

        if ($meal->state !== 'active') {
            return response()->json([
                'message' => "Meal isn't active"
            ]);
        }

        $orders = array();

        $priceSum = 0.0;

        foreach ($request->input('items') as $item) {
            $i = Item::select('price')->find($item);
            $order = new Order;
            $order->state = "pending";
            $order->item_id = $item;
            $order->meal_id = $mealID;
            $order->start = Carbon::now();
            $order->save();
            array_push($orders, $order->id);
            $priceSum += $i->price;
        }

        $meal->total_price_preview += $priceSum;
        $meal->save();

        return response()->json([
            'items' => $orders
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return MealResource
     */
    public function show($id)
    {
        /*$meal = Meal::with('orders.item:id')->find($id);
        return response()->json($meal, 404);*/
        return new MealResource(Meal::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Meal $meal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meal $meal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Meal $meal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meal $meal)
    {
        //
    }

    public static function getMealCountPerTable($table_number)
    {
        return Meal::where('table_number', $table_number)->count();
    }

    public static function canDeleteTable($table_number)
    {
        $meal = Meal::where('table_number', $table_number)->first();

        return $meal ? false : true;
    }

    public static function canDeleteuser($id)
    {
        $user = Meal::where('responsible_waiter_id', $id)->first();

        return $user ? false : true;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Database\Query\Expression
     */
    public function waiterMealsPerDay(Request $request)
    {
        $waiterId = $request->input('id');
        $total = Meal::where('responsible_waiter_id',$waiterId)->where('state','paid')->count();
        $sum = 0;
        return $sum;
    }
}
