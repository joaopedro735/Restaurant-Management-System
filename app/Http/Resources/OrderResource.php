<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Order;
use App\User;
use App\Http\Controllers\OrderControllerAPI;
use App\Http\Controllers\ItemControllerAPI;
use App\Http\Controllers\UserControllerAPI;

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
            'responsable_cook' => $this->responsibleCook->name,
            'created_at' => OrderControllerAPI::timestampToString($this->created_at),
            'responsible_cook_id' => $this->responsible_cook_id == null ? 0 : $this->responsible_cook_id,
            'start' => $this->start,
            'end' => $this->end,
            'updated_at' => OrderControllerAPI::timestampToString($this->updated_at),
            'item' => $this->item->name,
        ];
    }
}
