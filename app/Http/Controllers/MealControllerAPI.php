<?php

namespace App\Http\Controllers;

use App\Meal;
use Illuminate\Http\Request;

class MealControllerAPI extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
