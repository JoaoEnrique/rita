<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppointmentsController;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::group(['prefix' => 'appointments'], function () {
        Route::get('/', [AppointmentsController::class, "new"])->name("appointments.index");
        Route::get('/new', [AppointmentsController::class, "new"])->name('appointments.new');
        Route::post('/register', [AppointmentsController::class, "register"])->name('appointments.register');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
