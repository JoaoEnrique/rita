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
            return redirect()->route('appointments.index')->with('error', 'Acesso negado.');
        }
        return Inertia::render('appointments/register', [
            'appointment' => $appointment,
        ]);
    }

    public function save(Request $request){
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'send_notification' => 'boolean',
                'date_appointment' => 'required|date',
                'date_notification' => 'nullable|date',
            ]);

            $data['user_id'] = auth()->id();
            $data['was_sent'] = false;

            $appointment = Appointment::create($data);

            return redirect("/appointments/{$appointment->id}")->with('success', 'Agendamento cadastrado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao criar agendamento: ' . $e->getMessage());
        }
    }

    public function update(Request $request){
        try {
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
                return redirect()->route('appointments.index')->with('error', 'Acesso negado.');
            }

            
            $appointment->update($data);

            return redirect()->back()->with('success', 'Agendamento atualizado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao atualizar agendamento: ' . $e->getMessage());
        }
    }

    public function delete(Request $request){
        try {
            $data = $request->validate([
                'id' => 'required|exists:appointments,id',
            ]);

            $appointment = Appointment::findOrFail($data['id']);
            if ($appointment->user_id !== auth()->id()) {
                return redirect()->route('appointments.index')->with('error', 'Acesso negado.');
            }

            $appointment->delete();

            return redirect()->route('appointments.index')->with('success', 'Agendamento excluído.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao excluir agendamento: ' . $e->getMessage());
        }
    }
}
