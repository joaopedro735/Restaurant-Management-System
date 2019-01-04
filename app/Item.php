<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'description', 'photo_url', 'price'
    ];

    public static function itemTypeToStr($itemType)
    {
        switch ($itemType) {
            case 'dish':
                return 'Prato';
            case 'drink':
                return 'Bebida';
        }

        return 'Desconhecido';
    }

    public function invoices() {
        return $this->belongsToMany('App\Invoices', 'invoice_items')->withPivot('quantity', 'unit_price', 'sub_total_price');
    }
}
