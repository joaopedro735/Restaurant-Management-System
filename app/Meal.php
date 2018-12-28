<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    //
    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function invoice() {
        return $this->belongsTo('App\Invoice', 'id', 'meal_id');
    }

    public function waiter()
    {
        return $this->hasOne('App\User', 'id', 'responsible_waiter_id');
    }

    public function table()
    {
        return $this->hasOne('App\Table', 'table_number', 'table_number');
    }

    public static function stateToStr($orderState)
    {
        switch ($orderState) {
            case 'active':
                return 'Active';
            case 'terminated':
                return 'Terminated';
            case 'paid':
                return 'Paid';
            case 'not paid':
                return 'Not paid';
        }

        return 'Unknown';
    }

    public static function timestampToString($timestamp) {
        return mb_convert_encoding($timestamp, "UTF-8");;
    }
}
