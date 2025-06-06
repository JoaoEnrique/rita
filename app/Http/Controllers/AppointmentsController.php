<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;

class AppointmentsController extends Controller
{
    public function new(Request $request){
        return Inertia::render('appointments/register');
    }

    public function register(Request $request){
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'send_notification' => 'boolean',
            'date_appointment' => 'required|date',
            'date_notification' => 'nullable|date',
        ]);

        $data['user_id'] = auth()->id();
        $data['was_sent'] = false;

        Appointment::create($data);

        return redirect()->route('appointments.index')->with('success', 'Appointment registered successfully.');
    }
}
