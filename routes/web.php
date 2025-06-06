<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\RoutesController;

Route::get('/', [RoutesController::class, "index"])->name('home');
Route::get('/plans', [RoutesController::class, "plans"])->name('plans');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'appointments'], function () {
        Route::get('/', [AppointmentsController::class, "index"])->name("appointments.index");
        Route::get('/new', [AppointmentsController::class, "register"])->name('appointments.new');
        Route::get('/{appointment}', [AppointmentsController::class, 'edit']);
        Route::post('/register', [AppointmentsController::class, "save"])->name('appointments.register');
        Route::post('/update', [AppointmentsController::class, "update"])->name('appointments.update');
        Route::post('/delete', [AppointmentsController::class, "delete"])->name('appointments.delete');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
