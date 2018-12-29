<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\InvoicesResource;
use App\Invoice;
use Illuminate\Http\Request;

class InvoiceControllerAPI extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        if (request()->has("page")) {
            return InvoicesResource::collection(Invoice::paginate(request()->input("rowsPerPage", 10)));
        }
        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }

    public function pending()
    {
        if (request()->has("page")) {
            return InvoicesResource::collection(Invoice::where("state", "not paid")
                ->paginate(request()->input("rowsPerPage", 10)));
        }
        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return InvoiceResource
     */
    public function show($id)
    {
        return new InvoiceResource(Invoice::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    public function close(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        if ($invoice->state === "paid") {
            return response()->json([
                "message" => "Invoice already paid"
            ], 400);
        }

        if (!$request->has("nif") || !$request->has("name")) {
            return response()->json([
                "message" => "Request needs 'nif' and name 'parameters'"
            ], 400);
        }

        $request->validate([
            'nif' => 'required|integer|digits:9',
            'name' => 'required|regex:/^[\pL\s\-]+$/u',
        ], [
            "name.regex" => "Name must have only letters and spaces"
        ]);

        $invoice->nif = $request->input('nif');
        $invoice->name = ucwords($request->input('name'));
        $invoice->state = 'paid';
        $invoice->save();

        return $invoice;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
