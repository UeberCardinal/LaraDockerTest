<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainController::class, 'index'])->name('index');
Route::get('popup', [MainController::class, 'popup'])->name('popup');

Route::resource('product', ProductController::class);

Route::get('register', [RegisterController::class, 'register'])->name('register');
Route::post('register', [RegisterController::class, 'create'])->name('register_create');
Route::get('logout', [LoginController::class, 'logout'])->name('logout');
Route::post('auth', [LoginController::class, 'auth'])->name('auth');
Route::get('login', [LoginController::class, 'login'])->name('login');

Route::get('user/role', [UserController::class, 'userRole']);

