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
}
