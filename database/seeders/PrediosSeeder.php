<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrediosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datos = [

            [
                "id" => "01",
                "nombre" => "Los Manzanos",
                "localidad" => "Cipolletti",
                "canchacinco" =>"4",
                "canchaocho" => "2",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "02",
                "nombre" => "Todo Futbol",
                "localidad" => "Neuquen",
                "canchacinco" => "2",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "03",
                "nombre" => "Futbol 5",
                "localidad" => "Cinco-Salto",
                "canchacinco" => "1",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "04",
                "nombre" => "Oro Club",
                "localidad" => "Fernadez-Oro",
                "canchacinco" => "1",
                "canchaocho" => "3",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "05",
                "nombre" => "Deporte Anateur",
                "localidad" => "Centenario",
                "canchacinco" => "4",
                "canchaocho" => "0",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "06",
                "nombre" => "El Gallinero",
                "localidad" => "Cipolletti",
                "canchacinco" => "0",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "07",
                "nombre" => "Rinconcito",
                "localidad" => "Neuquen",
                "canchacinco" => "2",
                "canchaocho" => "4",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "08",
                "nombre" => "Tercer Tiempo",
                "localidad" => "Cinco-Salto",
                "canchacinco" => "3",
                "canchaocho" => "2",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "09",
                "nombre" => "Espacio Futbol",
                "localidad" => "Fernadez-Oro",
                "canchacinco" => "2",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "10",
                "nombre" => "Impresur FC",
                "localidad" => "Centenario",
                "canchacinco" => "2",
                "canchaocho" => "2",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "11",
                "predio" => "El Capataz",
                "localidad" => "Cipolletti",
                "canchacinco" => "1",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "12",
                "nombre" => "Locos Futbol Club",
                "localidad" => "Neuquen",
                "canchacinco" => "2",
                "canchaocho" => "1",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "13",
                "nombre" => "Lo Arrimado",
                "localidad" => "Neuquen",
                "canchacinco" => "2",
                "canchaocho" => "0",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "14",
                "predio" => "Es lo que hay",
                "localidad" => "Cipolletti",
                "canchacinco" => "0",
                "canchaocho" => "2",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "15",
                "nombre" => "Patogina FC",
                "localidad" => "Cipolletti",
                "canchacinco" => "3",
                "canchaocho" => "2",
                'created_at' => now(),
                'updated_at' => now(),
            ],

                ];

        DB::table('predios')->insert($datos);
    }
}
