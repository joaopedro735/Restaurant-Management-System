<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    public static function timestampToString($timestamp) {
        return mb_convert_encoding($timestamp, "UTF-8");;
    }
}
