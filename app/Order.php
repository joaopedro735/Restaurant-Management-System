<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public static function orderStateToStr($orderState)
    {
        switch ($orderState) {
            case 'pending':
                return 'Pendente';
            case 'confirmed':
                return 'Confirmado';
            case 'in preparation':
                return 'Em preparação';
            case 'prepared':
                return 'Preparado';
            case 'delivered':
                return 'Entregue';
            case 'not delivered':
                return 'Não entregue';
        }

        return 'Desconhecido';
    }

    public function item()
    {
        return $this->hasOne('App\Item', 'id', 'item_id');
    }
}
