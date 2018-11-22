<?php

namespace App\Http\Controllers;

class VueController extends Controller
{
    public function index()
    {
        // Alterar 'welcome' para o vue
        return view('vue.index');
    }

    // Adicionar o resto das páginas
}
