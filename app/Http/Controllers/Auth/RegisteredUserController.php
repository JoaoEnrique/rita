<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $rules = [
                'name' => ['required', 'string', 'max:50'],
                'user_name' => [
                    'required',
                    'string',
                    'max:20',
                    'unique:pacoca.users',
                    'regex:/^[^@\s?#&%\/:;=\'"{}\[\]\\\\|+]+$/'
                ],
    
                'email' => ['required', 'string', 'email', 'max:50', 'unique:pacoca.users'],
                'password' => ['required', 'string', 'min:8', 'max:50', 'confirmed'],
                'password_confirmation' => ['required', 'string', 'max:50', 'min:8'],
        ];

        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'user_name' => [
        //         'required',
        //         'string',
        //         'max:20',
        //         'unique:pacoca.users',
        //         'regex:/^[^@\s?#&%\/:;=\'"{}\[\]\\\\|+]+$/'
        //     ],
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);

        $messages = [
            'user_name.regex' => 'O nome de usuário não pode conter os seguintes caracteres: ? # & % / : ; = \' " { } [ ] \\ | +',
        ];
            
        $request->validate($rules, $messages);

        $user = User::create([
            'name' => $request->name,
            'user_name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('appointments.index');
    }
}
