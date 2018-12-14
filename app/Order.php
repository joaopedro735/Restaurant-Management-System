<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //

    public function item()
    {
        return $this->hasOne('App\Item', 'id', 'item_id');
    }
}
