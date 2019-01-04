<?php

namespace App\Http\Resources;

use App\Meal;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MealsResource extends JsonResource
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
            'responsible_waiter' => $this->waiter->name,
            'total_price_preview' => $this->total_price_preview,
            'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
            'updated_at' => Carbon::parse($this->updated_at)->toDateTimeString()
        ];
    }
}
