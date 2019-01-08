<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceItems;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\InvoicesResource;
use App\Invoice;
use App\InvoiceItem;
use App\Item;
use App\Meal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PDF;

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
            return InvoicesResource::collection(Invoice::orderBy('created_at', 'desc')->paginate(request()->input("rowsPerPage", 10)));
        }
        return response()->json([
            "message" => "Request needs page parameter",
        ], 400);
    }

    public function pending()
    {
        if (request()->has("page")) {
            return InvoicesResource::collection(Invoice::where("state", "pending")->orderBy('updated_at', 'desc')
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

    public function downloadPDF(Request $request, $id)
    {
        $invoice = Invoice::with('items')->with('meal.waiter:id,name')->findOrFail($id);
        if ($invoice->state !== "paid") {
            return response()->json([
                "message" => "Invoice is not closed."
            ], 400);
        }

        $pdf = PDF::loadView('invoice', compact('invoice'));
        $pdfName = "Invoice" . $invoice->id;
        return $pdf->download($pdfName);
    }

    public function close(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        if ($invoice->state !== "pending") {
            return response()->json([
                "message" => "Not possible to change this invoice"
            ], 400);
        }

        if (!$request->has("nif") || !$request->has("name")) {
            return response()->json([
                "message" => "Request needs 'nif' and name 'parameters'"
            ], 400);
        }

        $meal = Meal::findOrFail($invoice->meal_id);

        if ($meal->state !== "terminated") {
            return response()->json([
                "message" => "Associated meal isn't terminated"
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
        $meal->state = "paid";
        $invoice->save();
        $meal->save();

        return $invoice;
    }

    public function closeAsNotPaid(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        if ($invoice->state !== "pending") {
            return response()->json([
                "message" => "Not possible to change this invoice"
            ], 400);
        }

        $meal = Meal::findOrFail($invoice->meal_id);

        if ($meal->state !== "terminated") {
            return response()->json([
                "message" => "Associated meal isn't terminated"
            ], 400);
        }

        $invoice->state = 'not paid';
        $meal->state = "not paid";
        $invoice->save();
        $meal->save();

        return response()->json([
            "message" => "Invoice closed as not paid"
        ]);
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
