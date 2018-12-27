<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Table extends Model
{
    use SoftDeletes;

    protected $connection = 'mysql';
    
    protected $table = 'restaurant_tables';
    protected $primaryKey = 'table_number';

    protected $fillable = [
        'table_number', 'created_at', 'updated_at'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public static function timestampToString($timestamp) {
        return mb_convert_encoding($timestamp, "UTF-8");;
    }
}
