<?php

namespace App\Http\Controllers;

use App\Models\Alquiler;
use App\Http\Requests\StoreAlquilerRequest;
use App\Http\Requests\UpdateAlquilerRequest;
use App\Models\Predios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AlquilerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alquilados = Alquiler::all();
        $predios = Predios::all();
        $ciudad = Predios::select('localidad')->distinct()->get();
        return Inertia::render('Usuarios/Solicitud/Index', compact('ciudad', 'predios', 'alquilados'));
    }

      /**
     * Display the specified resource.
     */
    public function nombrePredio(Request $request)
    {
        $ciudad = $request->all();
        $ciudades = Predios::where('localidad', $ciudad)->get();
        return response()->json($ciudades);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'jugador' => 'required|string|max:255',
            'email' =>  'required|string|lowercase|email|max:255',
            'predio'  => 'required|string|max:255',
            'futbol' => 'required|string|max:255',
            'localidad'  => 'required|string|max:255',
            'direccion'  => 'required|string|max:255',
            'fecha' =>  'required|string|max:255',
            'horario' => 'required|string|max:255',
            'reserva' => 'required|string|max:255',
        ]);

        $alquilo = $request->all();

        Alquiler::create($alquilo);

        return Inertia::render('Dashboard');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $predioSelecionado = Predios::find($id);
        return Inertia::render('Usuarios/Solicitud/Crear', compact('predioSelecionado'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alquiler $alquiler)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAlquilerRequest $request, Alquiler $alquiler)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alquiler $alquiler)
    {
        //
    }
}
