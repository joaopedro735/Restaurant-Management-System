<?php

namespace App\Http\Controllers;

use App\Meal;

class MealControllerAPI extends Controller
{
    public static function getMealCountPerTable($table_number) {
        return Meal::where('table_number', $table_number)->count();
    }

    public static function canDeleteTable($table_number) {
        $meal =  Meal::where('table_number', $table_number)->first();

        return $meal ? false : true;
    }
}
