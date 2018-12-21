<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public static function orderStateToStr($orderState)
    {
        switch ($orderState) {
            case 'pending':
                return 'Pending';
            case 'confirmed':
                return 'Confirmed';
            case 'in preparation':
                return 'In preparation';
            case 'prepared':
                return 'Prepared';
            case 'delivered':
                return 'Delivered';
            case 'not delivered':
                return 'Not delivered';
        }

        return 'Unknown';
    }

    public function item()
    {
        return $this->hasOne('App\Item', 'id', 'item_id');
    }
}
