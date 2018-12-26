<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{

    protected $connection = 'mysql';
    protected $primaryKey = 'table_number';
    protected $table = 'restaurant_tables';

    public $timestamps = true;

    protected $fillable = [
        'table_number', 'created_at', 'updated_at'
    ];

    public static function timestampToString($timestamp) {
        return mb_convert_encoding($timestamp, "UTF-8");;
    }
}
