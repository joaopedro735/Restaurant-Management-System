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
            'id' => $this->id,
            'state' => Order::orderStateToStr($this->state),
            'responsible_cook' => OrderControllerAPI::getCookName($this->responsible_cook_id),
            'responsible_cook_id' => OrderControllerAPI::getCookID($this->responsible_cook_id),
            'created_at' => OrderControllerAPI::timestampToString($this->created_at),
            //'item' => $this->item()->value('name'),
            'start' => $this->start,
            'end' => $this->end,
            'updated_at' => OrderControllerAPI::timestampToString($this->updated_at)
        ];
    }
}
