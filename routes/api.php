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
    Route::get('/users/me', 'UserControllerAPI@myProfile');
    Route::post('logout', 'LoginControllerAPI@logout');
    Route::post('/account/create', 'UserControllerAPI@create');
});

Route::get('users', 'UserControllerAPI@index');
Route::middleware('auth:api')->get('users/me', 'UserControllerAPI@myProfile');


Route::get('menu', 'ItemControllerAPI@index');
Route::get('orders', 'OrderControllerAPI@index');

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