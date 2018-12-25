<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Table;

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
            'deleted_at' => Table::timestampToString($this->deleted_at),
            'created_at' => Table::timestampToString($this->created_at),
            'updated_at' => Table::timestampToString($this->updated_at)
        ];
    }
}
