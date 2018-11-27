<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\ItemResource as ItemResource;
use Illuminate\Support\Facades\DB;

use App\Item;
use App\StoreUserRequest;
use Hash;

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

    
}
