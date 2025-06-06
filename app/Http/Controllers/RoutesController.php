<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoutesController extends Controller
{
    public function index(){
        if(auth()->check())
            return redirect()->route("appointments.index");
        
            return inertia()->render("welcome");
    }
}
