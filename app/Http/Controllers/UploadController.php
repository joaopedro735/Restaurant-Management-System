<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Debugbar;

class UploadController extends Controller
{
    public function uploadItemimage(Request $request) {
        if ($request->file) {
            $file = $request->file;

            $file->store('items');
            Debugbar::info($file);
        }

        return response()->json([
            'hashName' => $file->hashName()
        ]);
    }
}
