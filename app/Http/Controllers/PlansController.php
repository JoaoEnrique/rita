<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;

class PlansController extends Controller
{
    public function index(Request $request){
        $plans = Plan::paginate(10);

        return Inertia::render('plans', [
            'plans' => $plans,
        ]);
    }
    
    public function manage(Request $request){
        $plans = Plan::paginate(10);

        return Inertia::render('plans/index', [
            'plans' => $plans,
        ]);
    }
        
    public function register(){
        return Inertia::render('plans/register');
    }

    public function edit($id){
        $plan = Plan::findOrFail($id);
        if ($plan->user_id !== auth()->id()) {
            return redirect()->route('plans.index')->with('error', 'Acesso negado.');
        }
        return Inertia::render('plans/register', [
            'plan' => $plan,
        ]);
    }

    public function save(Request $request){
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'value' => 'required',
                'icon' => 'required|string|max:255',
                'color' => 'string|max:255|required',
            ]);

            $data['user_id'] = auth()->id();

            $plan = Plan::create($data);

            return redirect("/plans/manage/{$plan->id}")->with('success', 'Plano cadastrado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao criar plano: ' . $e->getMessage());
        }
    }

    public function update(Request $request){
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'value' => 'required',
                'icon' => 'required|string|max:255',
                'color' => 'string|max:255|required',
                'id' => 'required|exists:plans,id',
            ]);

            $plan = Plan::findOrFail($data['id']);
            if ($plan->user_id !== auth()->id()) {
                return redirect()->route('plan.manage')->with('error', 'Acesso negado.');
            }

            $plan->update($data);

            return redirect()->back()->with('success', 'Plano atualizado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao atualizar plano: ' . $e->getMessage());
        }
    }

    public function delete(Request $request){
        try {
            $data = $request->validate([
                'id' => 'required|exists:plans,id',
            ]);

            $plan = Plan::findOrFail($data['id']);
            if ($plan->user_id !== auth()->id()) {
                return redirect()->route('plans.manage')->with('error', 'Acesso negado.');
            }

            $plan->delete();

            return redirect()->route('plans.manage')->with('success', 'Plano excluído.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao excluir plano: ' . $e->getMessage());
        }
    }
}
