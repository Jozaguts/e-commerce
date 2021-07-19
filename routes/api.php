<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::post('/users/login',[ LoginController::class, 'login']);

Route::group(['middleware' => 'auth:api','prefix'=>'/users'],  function() {
   Route::post('',[ UserController::class, 'store' ]);
   Route::get('',[ UserController::class, 'index' ]);
   Route::get('/{user}',[ UserController::class, 'show' ]);
   Route::put('/{user}',[ UserController::class, 'update' ]);
   Route::delete('/{user}',[ UserController::class, 'destroy' ]);
   Route::post('/logout',[ LoginController::class, 'logout']);
});

Route::get('/products', [ProductController::class,'index']);
Route::get('/products/{product:slug}', [ProductController::class,'show']);


Route::group(['middleware' => 'auth:api','prefix'=> '/products'],function() {
    Route::post('',[ProductController::class, 'store']);
    Route::patch('/{slug}', [ProductController::class,'toggleStatus']);
    Route::put('/{slug}',[ProductController::class, 'update']);
    Route::delete('/{slug}',[ProductController::class, 'destroy']);
});

