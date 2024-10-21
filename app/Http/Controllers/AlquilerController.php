<?php

namespace App\Http\Controllers;

use App\Models\Alquiler;
use App\Http\Requests\StoreAlquilerRequest;
use App\Http\Requests\UpdateAlquilerRequest;
use App\Models\Predios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlquilerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ciudad = Predios::select('localidad')->distinct()->get();
        return Inertia::render('Usuarios/Solicitud/Index', compact('ciudad'));
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
    public function store(StoreAlquilerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $predios = Predios::all();
        $predioSelecionado = Predios::find($id);
        return Inertia::render('Usuarios/Solicitud/Crear', compact('predios', 'predioSelecionado'));
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
