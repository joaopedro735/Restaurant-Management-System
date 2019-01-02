<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public function meal() {
        return $this->hasOne('App\Meal', 'id', 'meal_id');
    }

    public function items() {
        return $this->belongsToMany('App\Item', 'invoice_items')->withPivot('quantity', 'unit_price', 'sub_total_price');
    }
}

