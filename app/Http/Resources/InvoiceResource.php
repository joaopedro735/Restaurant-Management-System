<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'id' => $this->id,
            'table_number' => $this->meal->table_number,
            'waiter' => $this->meal->waiter->name,
            'date' => Carbon::parse($this->date)->format('d/m/Y'),
            'price' => $this->total_price,
            'meal_id' => $this->meal_id,
            'items' => [
                'dish' => InvoiceItems::collection($this->items->where('type', 'dish')),
                'drinks' => InvoiceItems::collection($this->items->where('type', 'drink'))
            ]
        ];
    }
}
