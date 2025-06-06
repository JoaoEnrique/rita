<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\RoutesController;
use App\Http\Controllers\PlansController;

Route::get('/', [RoutesController::class, "index"])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['prefix' => 'appointments'], function () {
        Route::get('/', [AppointmentsController::class, "index"])->name("appointments.index");
        Route::get('/register', [AppointmentsController::class, "register"])->name('appointments.new');
        Route::get('/{appointment}', [AppointmentsController::class, 'edit']);
        Route::post('/register', [AppointmentsController::class, "save"])->name('appointments.register');
        Route::post('/update', [AppointmentsController::class, "update"])->name('appointments.update');
        Route::post('/delete', [AppointmentsController::class, "delete"])->name('appointments.delete');
    });

    Route::group(['prefix' => 'plans'], function () {
        Route::get('/', [RoutesController::class, "plans"])->name("plans.index");

        Route::group(['prefix' => 'manage'], function () {
            Route::get('/', [PlansController::class, "index"])->name("plans.manage");
            Route::get('/register', [PlansController::class, "register"])->name('plans.register');
            Route::post('/', [PlansController::class, "save"])->name('plans.save');
            Route::get('/{id}', [PlansController::class, 'edit'])->name('plans.edit');
            Route::patch('/', [PlansController::class, "update"])->name('plans.update');
            Route::delete('/', [PlansController::class, "delete"])->name('plans.delete');
        });
        
        // Route::get('/', [RoutesController::class, "plans"])->name("plans.index");
        // Route::get('/manage', [PlansController::class, "index"])->name("appointments.manage");
        // Route::get('/new', [PlansController::class, "register"])->name('appointments.new');
        // Route::get('/{appointment}', [AppointmentsController::class, 'edit']);
        // Route::post('/register', [PlansController::class, "save"])->name('plans.register');
        // Route::post('/update', [AppointmentsController::class, "update"])->name('appointments.update');
        // Route::post('/delete', [AppointmentsController::class, "delete"])->name('appointments.delete');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
