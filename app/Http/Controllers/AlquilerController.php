<?php

namespace App\Http\Controllers;

use App\Models\Alquiler;
use App\Http\Requests\StoreAlquilerRequest;
use App\Http\Requests\UpdateAlquilerRequest;
use Inertia\Inertia;

class AlquilerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //dd('inner list');

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
    public function show(Alquiler $alquiler)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alquiler $alquiler)
    {
        //
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
