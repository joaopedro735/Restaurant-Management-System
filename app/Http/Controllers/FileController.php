<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request){
        if($request->hasFile('file')){
            $file = \Storage::putFile('profiles', $request->file);
            $file = basename($file);
            return $file;
        }else{
            return "No file input";
        }
    }
}
