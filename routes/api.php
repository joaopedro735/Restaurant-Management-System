<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'auth:api'
], function() {

    Route::post('logout', 'LoginControllerAPI@logout');
    Route::group([
        'prefix' => 'users'
    ], function() {
        Route::get('/', 'UserControllerAPI@index');
        Route::get('/me', 'UserControllerAPI@myProfile');
        Route::put('/me', 'UserControllerAPI@save');
        Route::post('/me/photo', 'FileController@store');
    });

    Route::group([
        'prefix' => 'account'
    ], function() {
        Route::post('/create', 'UserControllerAPI@create');
        Route::put('/changePassword', 'UserControllerAPI@changePassword');
    });

    Route::group([
        'prefix' => 'orders'
    ], function() {
        Route::get('/', 'OrderControllerAPI@index');
        Route::put('/{id}', 'OrderControllerAPI@update');
    });

    Route::group([
        'prefix' => 'tables'
    ], function() {
        Route::get('/', 'TableControllerAPI@index');
        Route::post('/', 'TableControllerAPI@store');
        Route::delete('/{id}', 'TableControllerAPI@destroy');
    });

    Route::group([
        'prefix' => 'invoices'
    ], function () {
        Route::get('/', 'InvoiceControllerAPI@index');
        Route::get('/pending', 'InvoiceControllerAPI@pending');
        Route::get('/download/{id}', 'InvoiceControllerAPI@downloadPDF');
        Route::get('/{id}', 'InvoiceControllerAPI@show');
        Route::patch('/close/{id}', 'InvoiceControllerAPI@close');
    });

    Route::group([
        'prefix' => 'meals'
    ], function () {
        Route::get('/', 'MealControllerAPI@index');
        Route::get('/{id}', 'MealControllerAPI@show');
    });
});

/* Route::get('menu', 'ItemControllerAPI@index'); */

Route::group([
    'prefix' => 'menu'
], function () {
    Route::get('/', 'ItemControllerAPI@index');
    Route::get('/drinks', 'ItemControllerAPI@indexDrinks');
    Route::get('/dishes', 'ItemControllerAPI@indexDishes');
    Route::post('/', 'ItemControllerAPI@store');
    Route::delete('/{id}', 'ItemControllerAPI@destroy');
});

Route::post('login', 'LoginControllerAPI@login');
Route::post('/account/confirm', 'UserControllerAPI@confirm');
Route::group([
    'namespace' => 'Auth',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});
