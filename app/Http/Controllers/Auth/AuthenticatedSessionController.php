<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;


use Spatie\Permission\Models\Role;




class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */


    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {


            $user = Auth::user();
            $roles = Role::all();
            $userRoles = $user->roles->pluck('name')->toArray();

            //dd($userRoles);
            foreach($userRoles as $usuarios){

                if ($usuarios === 'superadmin') {
                    //dd($userRoles);
                    return redirect()->intended('/dashboard'); // Redirigir al dashboard de admin
                }
                elseif ($usuarios === 'jugador') {
                    //dd('inner list');
                 return redirect()->intended('/Jugador/dashboard'); // Redirigir al dashboard de usuario
                }
                elseif ($usuarios === 'predio'){
                    //dd('Voy bien');
                    return redirect()->intended('/Predio/dashboard');
                }
                else{
                    dd('De volver error por favor');
                }
            }
        }

        return back()->withErrors([
            'email' => 'Las credenciales proporcionadas son incorrectas.',
        ]);
    }
    /*
        public function store(LoginRequest $request): RedirectResponse
        {
            $request->authenticate();

            $request->session()->regenerate();

            return redirect()->intended(route('dashboard', absolute: false));
        }
    */

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
