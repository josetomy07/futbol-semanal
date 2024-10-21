<?php

namespace App\Http\Controllers;


use App\Models\Predios;
use App\Http\Requests\StorePrediosRequest;
use App\Http\Requests\UpdatePrediosRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PrediosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      //
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
    public function store(StorePrediosRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Predios $predios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrediosRequest $request, Predios $predios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Predios $predios)
    {
        //
    }
}
