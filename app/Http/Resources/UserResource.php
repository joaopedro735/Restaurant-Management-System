<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'username' => $this->username,
            'type' => $this->type,
            'email' => $this->email,
            'photo_url' => 'storage/profiles/' . $this->photo_url,
            'shift_active' => $this->shift_active,
            'last_shift_start' => Carbon::parse($this->last_shift_start)->toDateTimeString(),
            'last_shift_end' => Carbon::parse($this->last_shift_end)->toDateTimeString(),
            'blocked' => $this->blocked == 0 ? false : true
        ];
    }
}
