<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/users/login',[ LoginController::class, 'login']);

Route::group(['middleware' => 'auth:api','prefix'=>'/users'],  function() {
   Route::post('/',[ UserController::class, 'store' ]);
   Route::get('/',[ UserController::class, 'index' ]);
   Route::get('/{user}',[ UserController::class, 'show' ]);
   Route::put('/{user}',[ UserController::class, 'update' ]);
});

