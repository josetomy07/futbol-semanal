<?php

namespace App\Http\Controllers;

use App\Models\Alquiler;
use App\Http\Requests\StoreAlquilerRequest;
use App\Http\Requests\UpdateAlquilerRequest;
use App\Models\Predios;
use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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
        return Inertia::render('Usuarios/Solicitud/Index', compact('ciudad', 'predios','alquilados'));
    }


     /**
     * Display a listing of the resource.
     */
    public function contarCanchasAlquiladas()
    {
        $hoy = Carbon::today();
        $alquilado = Alquiler::whereDate('fecha', '2024-11-4')
                                ->select('predio', 'direccion', 'horario', 'futbol', DB::raw('SUM(COALESCE(reserva, 0)) as ocupadas'))
                                ->groupBy('predio', 'direccion', 'horario', 'futbol')->get(); // Cambia 'fecha' por el nombre de tu columna


        $totalPredios = DB::table('predios')->select('*', DB::raw('cinco + ocho as total_canchas'))->get();

        $arregloPredio = $totalPredios->map(function ($arrayPredios) {
            return [
                'id' => $arrayPredios->id,
                'predio' => $arrayPredios->nombre, // Asegúrate de que 'nombre' sea el campo correcto
                'domicilio' => $arrayPredios->direccion,
                'futbol 5' => $arrayPredios->cinco,
                'futbol 8' => $arrayPredios->ocho,
                'total' => $arrayPredios->total_canchas,
            ];
        });

        $arregloReservado = $alquilado->map(function ($arrayReservado) {
            return [
                'nombre' => $arrayReservado->predio, // Asegúrate de que 'nombre' sea el campo correcto
                'ubicacion' => $arrayReservado->direccion,
                'horas' => $arrayReservado->horario,
                'futbol' => $arrayReservado->futbol,
                'ocupadas'=> (int)$arrayReservado->ocupadas,
            ];
        });

        $totalDiponible = []; //Obtengo arreglo legible de diponible

        foreach ($arregloPredio as $predio) {

            $nombre = $predio['predio'];
            $ubicacion = $predio['domicilio'];
            //'total' => $predio['total'],
            $canchas = [
                'futbol 5' => [
                                20 =>$predio['futbol 5'],
                                21 =>$predio['futbol 5'],
                                22 =>$predio['futbol 5'],
                                23 =>$predio['futbol 5'],
                                ],
                'futbol 8' => [
                                20 =>$predio['futbol 8'],
                                21 =>$predio['futbol 8'],
                                22 =>$predio['futbol 8'],
                                23 =>$predio['futbol 8'],
                                ],
            ];

        }

        $totalOcupadas = []; //Obtengo arreglo legible de ocupadas

        foreach ($arregloReservado as $reserva) {

            $nombre = $reserva['nombre'];
            //$ubicacion = $reserva['ubicacion'];
            $hora = $reserva['horas'];
            $tipo = $reserva['futbol'];

            if (isset($totalDiponible[$nombre])) {

                $totalOcupadas[$nombre]['canchas'][$tipo][$hora] = $reserva['ocupadas'];
            }
        }

        $turnos = [20, 21, 22, 23];

        foreach ($totalDiponible as $nombrePredio => &$info) {

            if (isset($totalOcupadas[$nombrePredio])) { //Obtengo los predios alquilados.

                foreach($info as $tipOcupadas => &$futbol ){ //Traes las canchas para saber si tiene disponibilidad predios

                    if (isset($totalOcupadas[$nombrePredio][$tipOcupadas])) {

                        $alquiladasCantidadPorHora = []; // Inicializar la cantidad de canchas alquiladas

                        foreach ($totalOcupadas[$nombrePredio][$tipOcupadas] as $hora => $cantidad) {  // Recorre las reservas para obtener la cantidad de canchas alquiladas por hora

                            $alquiladasCantidadPorHora[$hora]= $cantidad;
                        }

                        foreach ($turnos as $turno) {

                            if (isset($futbol[$hora][$turno])) { // Solo restar si hay reservas para esa hora

                                if (isset($alquiladasCantidadPorHora[$hora][$turno])) {

                                    $futbol[$hora][$turno] = max(0, $futbol[$hora][$turno] - $alquiladasCantidadPorHora[$hora][$turno]);  // Restar solo en la hora de alquiler

                                } else {

                                    // Mantener el valor original para otros turnos sin reservas

                                    $futbol[$hora][$turno] = $futbol[$hora][$turno];
                                }
                            }
                        }

                    }
                }

            }
        };

        return response()->json(['totalDiponibles' => $totalDiponible]);

    }


    /**
    * Display the specified resource.
    */
    public function nombrePredio(Request $request, $id)
    {
        $ciudades = Predios::where('localidad', $id)->get();
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

        return Inertia::render('dashboard');
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
