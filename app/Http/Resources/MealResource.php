<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
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
            'state' => Meal::stateToStr($this->state),
            'table_number' => $this->table_number,
            'start' => $this->start,
            'end' => $this->end,
            'responsible_waiter_id' => $this->responsible_waiter_id,
            'responsible_waiter' => UserControllerAPI::getWaiterName($this->responsible_waiter_id),
            'total_price_preview' => $this->total_price_preview,
            'created_at' => Order::timestampToString($this->created_at),
            'updated_at' => Order::timestampToString($this->updated_at)
        ];
    }
}
