<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\carbon;
use App\Table;

use App\Http\Controllers\MealControllerAPI;

class TableResource extends JsonResource
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
            'table_number' => $this->table_number,
            'deleted_at' => Carbon::parse($this->deleted_at)->format('d/m/Y \(H:m\)'),
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y \(H:m\)'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/Y \(h:m\)'),
            'total_meals' => MealControllerAPI::getMealCountPerTable($this->table_number)
        ];
    }
}
