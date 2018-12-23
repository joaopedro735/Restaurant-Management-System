<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Order;
use App\Http\Controllers\OrderControllerAPI;

class OrderResource extends JsonResource
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
            'state' => Order::orderStateToStr($this->state),
            'responsable_cook' => $this->responsibleCook->name,
            'created_at' => OrderControllerAPI::timestampToString($this->created_at),
            'start' => $this->start,
            'end' => $this->end,
            'updated_at' => OrderControllerAPI::timestampToString($this->updated_at),
            'item' => $this->item->name,
        ];
    }
}