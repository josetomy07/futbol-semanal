<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlquilerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    /*
    //Se Bloquea nuestro uso
    public function authorize(): bool
    {
        return false;
    }*/

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jugador' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'predio'  => ['required', 'string', 'max:255'],
            'futbol' => ['required', 'string', 'max:255'],
            'localidad'  => ['required', 'string', 'max:255'],
            'direccion'  => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'string', 'max:255'],
            'horario' => ['required', 'string', 'max:255'],
            'recerva' => ['required', 'string', 'max:255'],
          ];
    }
}
