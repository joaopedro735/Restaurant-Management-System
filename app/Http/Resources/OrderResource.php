<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'state' => $this->state,
            'responsable_cook_id' => $this->responsable_cook_id,
            'created_at' => $this->created_at,
            'start' => $this->start,
            'end' => $this->end,
            'updated_at' => $this->updated_at
        ];
    }
}
