<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\RoutesController;

Route::get('/', [RoutesController::class, "index"])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'appointments'], function () {
        Route::get('/', [AppointmentsController::class, "index"])->name("appointments.index");
        Route::get('/new', [AppointmentsController::class, "new"])->name('appointments.new');
        Route::post('/register', [AppointmentsController::class, "register"])->name('appointments.register');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
