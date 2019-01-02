<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TableResource;

use App\Table;
use Validator;

class TableControllerAPI extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page'))
        {
            return TableResource::collection(Table::paginate($request->input('rowsPerPage', 15)));
        }

        return response()->json([
                "message" => "Request needs page parameter",
            ], 400);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'table_number' => 'required|integer|unique:restaurant_tables|between:0,99999999999',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $table = new Table();
        $table->table_number = $request->table_number;
        $table->save();
        
        return new TableResource($table);
    }

    public function destroy($id) {
        $table = Table::findOrFail($id);

        $canDeleteTable = MealControllerAPI::canDeleteTable($id);

        $canDeleteTable ? $table->forceDelete() : $table->delete();

        return response()->json(null, 204);
    }
}
