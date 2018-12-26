<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Order;
use App\User;
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
            'state' => Order::stateToStr($this->state),
            /*'item' => ItemControllerAPI::getItemName($this->item_id),*/
            'item' => $this->item->name,
            'responsible_cook_id' => $this->responsible_cook_id == null ? 0 : $this->responsible_cook_id,
            /*'responsible_cook' => UserControllerAPI::getCookName($this->responsible_cook_id),*/
            'responsible_cook' => $this->responsibleCook()->value('name'),
            'start' => $this->start,
            'end' => $this->end,
            'created_at' => Order::timestampToString($this->created_at),
            'updated_at' => Order::timestampToString($this->updated_at),

        ];
    }
}
