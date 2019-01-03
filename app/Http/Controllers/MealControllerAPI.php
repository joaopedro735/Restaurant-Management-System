<?php

namespace App\Http\Controllers;
use App\Http\Resources\MealResource;
use App\Meal;
use App\Table;
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
        return MealResource::collection(Meal::paginate(10));
    }

    public function active()
    {
        return MealResource::collection(Meal::where('responsible_waiter_id', Auth::guard('api')->user()->id)
            ->where('state', 'active')
            ->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Meal
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'table_number'     => 'required|integer|exists:restaurant_tables,table_number',
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

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        /*$meal = Meal::with('orders.item:id')->find($id);
        return response()->json($meal, 404);*/
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Meal  $meal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Meal $meal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Meal  $meal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Meal $meal)
    {
        //
    }

    public static function getMealCountPerTable($table_number) {
        return Meal::where('table_number', $table_number)->count();
    }

    public static function canDeleteTable($table_number) {
        $meal =  Meal::where('table_number', $table_number)->first();

        return $meal ? false : true;
    }

    public static function canDeleteuser($id) {
        $user =  Meal::where('responsible_waiter_id', $id)->first();

        return $user ? false : true;
    }
}
