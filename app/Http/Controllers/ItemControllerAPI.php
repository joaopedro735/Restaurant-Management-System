<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\ItemResource as ItemResource;
use Illuminate\Support\Facades\DB;

use App\Item;
use App\StoreUserRequest;
use Hash;
use Debugbar;

class ItemControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page'))
        {
            return ItemResource::collection(Item::paginate(10));
        }
        else
        {
            return ItemResource::collection(Item::all());
        }
    }

    public function indexDrinks(Request $request)
    {
        if ($request->has('page'))
        {
            return ItemResource::collection(Item::where('type', 'drink')
                ->paginate($request->input('rowsPerPage', 15)));
        }

        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }

    public function indexDishes(Request $request)
    {
        if ($request->has('page'))
        {
            return ItemResource::collection(Item::where('type', 'dish')
                ->paginate($request->input('rowsPerPage', 15)));
        }

        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }


    public static function getItemName($id) {
        return Item::find($id)->name;
    }
}
