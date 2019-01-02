<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ItemResource;

use App\Item;
use Validator;

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

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:drink,dish',
            'description' => 'required|string|max:255',
            'photo_url' => 'required|max:255',
            'price' => 'required|between:0,999999.99'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $item = new Item();
        $item->name = $request->name;
        $item->type = $request->type;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->photo_url = $request->photo_url;
        $item->save();
        
        return new ItemResource($item);
    }

    public function destroy($id) {
        $item = Item::findOrFail($id);

        /* Storage::delete('/public/items/' . $item->photo_url); */

        $canDeleteItem = OrderControllerAPI::canDeleteItem($id);

        $canDeleteItem ? $item->forceDelete() : $item->delete();

        return response()->json(null, 204);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:drink,dish',
            'description' => 'required|string|max:255',
            'photo_url' => 'required|max:255',
            'price' => 'required|between:0,999999.99'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $item->update($request->all());

        return new ItemResource($item);
    }
}
