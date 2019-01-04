<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'state', 'responsible_cook_id'
    ];

    public static function stateToStr($orderState)
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
        return $this->hasOne('App\Item', 'id', 'item_id')->withTrashed();
    }

    public function responsibleCook()
    {
        return $this->hasOne('App\User', 'id', 'responsible_cook_id')->withTrashed();
    }

    public function meal()
    {
        return $this->belongsTo('App\Meal');
    }

    public static function timestampToString($timestamp)
    {
        return mb_convert_encoding($timestamp, "UTF-8");
    }
}
