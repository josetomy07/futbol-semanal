<?php
// app/Http/Controllers/SoapTokenController.php

namespace App\Http\Controllers;

use App\Models\SoapToken;
use Illuminate\Http\Request;

class SoapTokenController extends Controller
{
    public function index()
    {
        return SoapToken::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'token' => 'required|string',
            'sign' => 'required|string',
            'expiration' => 'required|string',
        ]);

        return SoapToken::create($validatedData);
    }

    public function show($id)
    {
        return SoapToken::findOrFail($id);
    }

    public function getToken() {
        return SoapToken::all();
    }

    public function update(Request $request, $id)
    {
        $tableName = SoapToken::findOrFail($id);
        $tableName->update($request->all());

        return $tableName;
    }

    public function destroy($id)
    {
        $tableName = SoapToken::findOrFail($id);
        $tableName->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
