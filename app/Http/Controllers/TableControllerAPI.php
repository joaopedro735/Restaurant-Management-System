<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\TableResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Table;
use Validator;
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
                return TableResource::collection(Table::paginate($request->input('rowsPerPage', 15))
                );
            }

            return TableResource::collection(Table::paginate($request->input('rowsPerPage', 15)));
        }
    }

    public function store(Request $request)
    {
        Debugbar::info('Table number from request: ' . $request->table_number);

        $validator = Validator::make($request->all(), [
            'table_number' => 'required|integer|unique:restaurant_tables|min:1',
        ]);

        if ($validator->fails()) {
            Debugbar::error($validator->errors());
            return response()->json($validator->errors(), 422);
        }

        $table = new Table();
        $table->table_number = $request->table_number;
        $table->save();

        Debugbar::info('Table number from table object: ' . $table->table_number);
        
        return new TableResource($table);
    }

    public function destroy(Request $request) {
        $table = Table::findOrFail($request->table_number);

        $table->delete();

        return response()->json(null, 204);

        /* if ($table->trashed()) {
             return response()->json([
                'message' => 'Table deleted'
            ]);
        } */
    }
}
