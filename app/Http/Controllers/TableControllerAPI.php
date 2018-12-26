<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\TableResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Table;
use Hash;
use Debugbar;

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

    public function store(Request $request)
    {
        // TODO: Proper validation
        $lastTable = DB::table('restaurant_tables')->max('table_number');

        // Why is $validate an User object?
        $validate = $request->validate([
            'table_number' => 'required|integer|min:' . ($lastTable + 1)
        ]);

        $table = new Table($validate);
        $table->save();

        Debugbar::info('Last table number: ' . $lastTable);
        Debugbar::info('Table number from request: ' . $request->table_number);
        Debugbar::info('Table number from table object: ' . $table->table_number);
        
        return new TableResource($table);
    }
}
