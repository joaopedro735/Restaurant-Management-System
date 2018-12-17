<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\OrderResource as OrderResource;
use Illuminate\Support\Facades\DB;

use App\Order;
use App\StoreUserRequest;
use Hash;

class OrderControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page'))  {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1) {
                return OrderResource::collection(Order::all());
            }
            return OrderResource::collection(Order::paginate($request->input('rowsPerPage', 10)));
        }
        elseif ($request->has('nmr'))  {
            return Order::count();
        }
        else
        {
            return OrderResource::collection(Order::all());
        }
    }
    }
}
