<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
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
}
