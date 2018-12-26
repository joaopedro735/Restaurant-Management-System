<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\TableResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
                return TableResource::collection(DB::table('restaurant_tables')
                    ->paginate($request->input('rowsPerPage', 10))
                );
            }

            return TableResource::collection(DB::table('restaurant_tables')
                ->paginate($request->input('rowsPerPage', 10))
            );
        }
    }

    public function create(Request $request)
    {
        // TODO: Proper validation
        $lastTable = DB::table('restaurant_tables')->max('table_number');

        $validatedData = $request->validate([
            'table_number' => 'required|integer|min:' . ($lastTable + 1)
        ]);

        $table = new Table($validatedData);
        $table->save();
        
        return new TableResource($table);
    }
}
