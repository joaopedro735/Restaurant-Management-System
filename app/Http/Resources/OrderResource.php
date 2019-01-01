<?php

namespace App\Http\Resources;

use App\Order;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'state' => Order::stateToStr($this->state),
            'item' => $this->item->name,
            'responsible_cook_id' => $this->responsible_cook_id ?? 0,
            'responsible_cook' => $this->responsibleCook()->value('name'),
            'start' => $this->start,
            'end' => $this->end,
            'created_at' => Order::timestampToString($this->created_at),
            'updated_at' => Order::timestampToString($this->updated_at),

        ];
    }
}
