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
                "direccion" => "megelle 156",
                "cinco" =>"4",
                "ocho" => "2",
                "latitude" => "-38.903359",
                "longitude" => "-68.060716",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "02",
                "nombre" => "Todo Futbol",
                "localidad" => "Neuquen",
                "direccion" => "calle falsa 123",
                "cinco" => "2",
                "ocho" => "1",
                "latitude" => "-38.977272",
                "longitude" => "-68.058570",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "03",
                "nombre" => "Futbol 5",
                "localidad" => "Cinco-Salto",
                "direccion" => "new cinco 201",
                "cinco" => "1",
                "ocho" => "1",
                "latitude" => "-38.831022",
                "longitude" => "-68.055153",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "04",
                "nombre" => "Oro Club",
                "localidad" => "Fernandez-Oro",
                "direccion" => "oro 873",
                "cinco" => "1",
                "ocho" => "3",
                "latitude" => "-38.957978",
                "longitude" => "-67.926131",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "05",
                "nombre" => "Deporte Anateur",
                "localidad" => "Centenario",
                "direccion" => "sin numero 10",
                "cinco" => "4",
                "ocho" => "0",
                "latitude" => "-38.822940",
                "longitude" => "-68.124472",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "06",
                "nombre" => "El Gallinero",
                "localidad" => "Cipolletti",
                "direccion" => "venezuela 45",
                "cinco" => "0",
                "ocho" => "1",
                "latitude" => "-38.925173",
                "longitude" => "-67.962735",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "07",
                "nombre" => "Rinconcito",
                "localidad" => "Neuquen",
                "direccion" => "escondido 100",
                "cinco" => "2",
                "ocho" => "4",
                "latitude" => "-38.966896",
                "longitude" => "-68.101442",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "08",
                "nombre" => "Tercer Tiempo",
                "localidad" => "Cinco-Salto",
                "direccion" => "salto la cuadra 625",
                "cinco" => "3",
                "ocho" => "2",
                "latitude" => "-38.834875",
                "longitude" => "-68.064415",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "09",
                "nombre" => "Espacio Futbol",
                "localidad" => "Fernandez-Oro",
                "direccion" => "fernandez 1000",
                "cinco" => "2",
                "ocho" => "1",
                "latitude" => "-38.951975",
                "longitude" => "-67.914989",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "10",
                "nombre" => "Impresur FC",
                "localidad" => "Centenario",
                "direccion" => "centenario 1540",
                "cinco" => "2",
                "ocho" => "2",
                "latitude" => "-38.823253",
                "longitude" => "-68.132368",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "11",
                "nombre" => "El Capataz",
                "localidad" => "Cipolletti",
                "direccion" => "tres arroyos 549",
                "cinco" => "1",
                "ocho" => "1",
                "latitude" => "-38.943992",
                "longitude" => "-67.988516",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "12",
                "nombre" => "Locos Futbol Club",
                "localidad" => "Neuquen",
                "direccion" => "parque industrial",
                "cinco" => "2",
                "ocho" => "1",
                "latitude" => "-38.923950",
                "longitude" => "-68.076565",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "13",
                "nombre" => "Lo Arrimado",
                "localidad" => "Neuquen",
                "direccion" => "rio salado 6981",
                "cinco" => "2",
                "ocho" => "0",
                "latitude" => "-38.956722",
                "longitude" => "-68.101939",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "14",
                "nombre" => "Es lo que hay",
                "localidad" => "Cipolletti",
                "direccion" => "av peron 378",
                "cinco" => "0",
                "ocho" => "2",
                "latitude" => "-38.916103",
                "longitude" => "-67.972098",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                "id" => "15",
                "nombre" => "Patogina FC",
                "localidad" => "Cipolletti",
                "direccion" => "cuatro esquina",
                "cinco" => "3",
                "ocho" => "2",
                "latitude" => "-38.940366",
                "longitude" => "-67.951598",
                'created_at' => now(),
                'updated_at' => now(),
            ],

                ];

        DB::table('predios')->insert($datos);
    }
}
