<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\MealResource;
use Illuminate\Support\Facades\DB;

use App\Meal;
use Hash;

class MealControllerAPI extends Controller
{
    public static function getMealCountPerTable($table_number) {
        return Meal::where('table_number', $table_number)->count();
    }

    public static function canDeleteTable($table_number) {
        $meal =  Meal::where('table_number', $table_number)->first();

        return $meal ? false : true;

        /* if (!$meal) {
            return true;
        }

        return false; */
    }
}
