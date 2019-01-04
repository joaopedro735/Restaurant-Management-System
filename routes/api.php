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
        Route::put('/block/{id}', 'UserControllerAPI@blockUser');
        Route::put('/unblock/{id}', 'UserControllerAPI@unblockUser');
        Route::delete('/{id}', 'UserControllerAPI@destroy');
        Route::put('/me/start', 'UserControllerAPI@startWorking');
        Route::put('/me/end', 'UserControllerAPI@stopWorking');
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
        Route::get('/my/active', 'OrderControllerAPI@waiterActive');
        Route::get('/my/prepared', 'OrderControllerAPI@waiterPrepared');
        Route::patch('/deliver/{id}', 'OrderControllerAPI@deliverOrder');
        Route::put('/{id}', 'OrderControllerAPI@update');
    });

    Route::group([
        'prefix' => 'tables'
    ], function() {
        Route::get('/', 'TableControllerAPI@index');
        Route::post('/', 'TableControllerAPI@store');
        Route::get('/available', 'TableControllerAPI@available');
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
        Route::post('/', 'MealControllerAPI@store');
        Route::get('/my/active', 'MealControllerAPI@active');
        Route::post('/addOrder/{id}', 'MealControllerAPI@addOrderToMeal');
        Route::get('/{id}', 'MealControllerAPI@show');
    });

    Route::group([
        'prefix' => 'menu'
    ], function () {
        Route::post('/', 'ItemControllerAPI@store');
        Route::post('/image', 'UploadController@uploadItemImage');
        Route::put('/{id}', 'ItemControllerAPI@update');
        Route::delete('/{id}', 'ItemControllerAPI@destroy');
    });
});

Route::group([
    'prefix' => 'menu'
], function () {
    Route::get('/', 'ItemControllerAPI@index');
    Route::get('/drinks', 'ItemControllerAPI@indexDrinks');
    Route::get('/dishes', 'ItemControllerAPI@indexDishes');
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
