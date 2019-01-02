<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceItems extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'quantity' => $this->pivot->quantity,
            'unit_price' => $this->pivot->unit_price,
            'sub_total_price' => $this->pivot->sub_total_price,
        ];
    }
}
