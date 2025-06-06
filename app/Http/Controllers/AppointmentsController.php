<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;

class AppointmentsController extends Controller
{
    public function index(Request $request){
        $appointments = Appointment::where('user_id', auth()->id())
            ->orderBy('date_appointment', 'asc')
            ->paginate(10);

        return Inertia::render('appointments/index', [
            'appointments' => $appointments,
        ]);
    }
        
    public function register(){
        return Inertia::render('appointments/register');
    }

    public function edit($id){
        $appointment = Appointment::findOrFail($id);
        if ($appointment->user_id !== auth()->id()) {
            return redirect()->route('appointments.index')->with('error', 'Unauthorized access to appointment.');
        }
        return Inertia::render('appointments/register', [
            'appointment' => $appointment,
        ]);
    }

    public function save(Request $request){
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

        return redirect()->route('appointments.index')->with('success', 'Agendamento cadastrado.');
    }

    public function update(Request $request){
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'send_notification' => 'boolean',
            'date_appointment' => 'required|date',
            'date_notification' => 'nullable|date',
            'id' => 'required|exists:appointments,id',
        ]);

        $appointment = Appointment::findOrFail($data['id']);
        if ($appointment->user_id !== auth()->id()) {
            return redirect()->route('appointments.index')->with('error', 'Unauthorized access to appointment.');
        }

         
        $appointment->update($data);

        return redirect()->back()->with('success', 'Agendamento atualizado.');
    }
}
