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
        Route::get('/', 'OrderControllerAPI@index')/* ->middleware(['auth:api', 'scopes:manage-order']) */;
        Route::put('/{id}', 'OrderControllerAPI@update')/* ->middleware(['auth:api', 'scopes:manage-order']) */;
    });

});

Route::get('users', 'UserControllerAPI@index');
Route::middleware('auth:api')->get('users/me', 'UserControllerAPI@myProfile');

Route::get('menu', 'ItemControllerAPI@index');


Route::get('tables', 'TableControllerAPI@index');

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