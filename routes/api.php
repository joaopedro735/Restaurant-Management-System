<?php

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
], function () {
    Route::post('logout', 'LoginControllerAPI@logout');

    Route::group([
        'prefix' => 'users'
    ], function () {
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
    ], function () {
        Route::post('/create', 'UserControllerAPI@create');
        Route::put('/changePassword', 'UserControllerAPI@changePassword');
    });

    Route::group([
        'prefix' => 'orders',
        'middleware' => ['cook.waiter']
    ], function () {
        Route::get('/', 'OrderControllerAPI@index');
        Route::patch('/deliver/{id}', 'OrderControllerAPI@deliverOrder');
        Route::put('/{id}', 'OrderControllerAPI@update');
        Route::patch('/confirm', 'OrderControllerAPI@confirm');
        Route::delete('/delete/{id}', 'OrderControllerAPI@delete');
    });

    Route::group([
        'prefix' => 'orders',
        'middleware' => 'cook.waiter'
    ], function () {
        Route::get('/my/active', 'OrderControllerAPI@waiterActive');
        Route::get('/my/prepared', 'OrderControllerAPI@waiterPrepared');
    });

    Route::group([
        'prefix' => 'tables',
        'middleware' => 'waiter'
    ], function () {
        Route::get('/available', 'TableControllerAPI@available');
    });

    Route::group([
        'prefix' => 'tables',
        'middleware' => 'manager'
    ], function () {
        Route::get('/', 'TableControllerAPI@index');
        Route::post('/', 'TableControllerAPI@store');
        Route::delete('/{id}', 'TableControllerAPI@destroy');
        Route::patch('/{id}', 'TableControllerAPI@update');
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
        'prefix' => 'meals',
        'middleware' => 'waiter'
    ], function () {
        Route::post('/', 'MealControllerAPI@store');
        Route::get('/my/active', 'MealControllerAPI@active');
        Route::post('/addOrder/{id}', 'MealControllerAPI@addOrderToMeal');
        Route::get('/checkTerminate/{id}', 'MealControllerAPI@mealHasPendingOrders');
        Route::patch('/terminate/{id}', 'MealControllerAPI@terminateMeal');
        Route::get('/{id}', 'MealControllerAPI@show');
        Route::get('/{id}/average', 'MealControllerAPI@waiterMealsPerDay');
    });

    Route::group([
        'prefix' => 'meals',
        'middleware' => 'waiter.manager'
    ], function () {
        Route::get('/', 'MealControllerAPI@index');
        Route::patch('/terminate/{id}', 'MealControllerAPI@terminateMeal');
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

Route::get('teste', 'MealControllerAPI@teste');

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
