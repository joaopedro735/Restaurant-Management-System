<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\TableResource;
use Illuminate\Support\Facades\DB;

use App\Table;
use Hash;

class TableControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page'))
        {
            if ($request->has('rowsPerPage') && $request->input('rowsPerPage') == -1)
            {
                return TableResource::collection(Table::all()
                    ->paginate($request->input('rowsPerPage', 10))
                );
            }

            return TableResource::collection(Table::all()
                ->paginate($request->input('rowsPerPage', 10))
            );
        }
    }
}
