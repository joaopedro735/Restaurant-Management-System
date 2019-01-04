<?php

namespace App\Http\Resources;

use App\Order;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResourceMeal extends JsonResource
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
            'price' => $this->item->price,
            'responsible_cook' => $this->responsibleCook()->value('name'),
            'table_number' => $this->meal->table_number
        ];
    }
}
