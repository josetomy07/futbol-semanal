<?php

use App\Http\Controllers\AlquilerController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PrediosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//dashboard jugador
Route::prefix('/Jugador')->group( function(){
    Route::get('/dashboard', [JugadorController::class, 'index'])->name('Jugador.Dashjugador');
});

//dashboard Predios
Route::prefix('/Predio')->group( function(){
    Route::get('/dashboard', [PrediosController::class, 'index'])->name('Predio.Dashpredios');
});

//Edita perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Majador de roles y permisos
Route::prefix('/dashboard')->group( function(){
    Route::resource('Roles', RolesController::class);
    Route::resource('Usuarios/Administrador', UserController::class);
    Route::resource('post', PostController::class);
    Route::resource('Solicitud', AlquilerController::class);
    Route::resource('Predio', PrediosController::class);
});


//Solicitudes de fechas, devuelve los predios.
Route::get('/Solicitud/hoy', [AlquilerController::class, 'contarCanchasAlquiladas'])->name('Solicitud.contarCanchasAlquiladas');
Route::get('/Solicitud/{localidadId}', [AlquilerController::class, 'nombrePredio'])->name('Solicitud.nombrePredio');
Route::post('/Solicitud/disponibles', [AlquilerController::class, 'predioAlquilado'])->name('Solicitud.predioAlquilado');




require __DIR__.'/auth.php';



/*
Route::middleware(['auth', 'Jugador'])->group(function () {
    Route::get('/Jugador', [JugadorController::class, 'index'])->name('Jugador.Dashjugador');
});
*/

/*
Route::group(['prefix' => 'Jugador', 'middleware' => ['auth']], function () {
    Route::get('/dashboard', [JugadorController::class, 'index'])->name('Jugador.Dashjugador');
});
*/

/*
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard'); // Dashboard de admin
    })->name('dashboard');
});*/
