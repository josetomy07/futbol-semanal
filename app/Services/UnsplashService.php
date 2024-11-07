<?php

namespace App\Services;

use GuzzleHttp\Client;

class UnsplashService
{
    protected $client;
    protected $accessKey;

    public function __construct()
    {
        // Instancia de GuzzleHttp Client
        $this->client = new Client();
        // Accede a la clave API de Unsplash desde el archivo .env
        $this->accessKey = env('UNSPLASH_ACCESS_KEY');
    }

    /**
     * Realiza la búsqueda de fotos en Unsplash.
     *
     * @param string $query
     * @param int $page
     * @param int $perPage
     * @return array
     */
    public function searchPhotos($query, $page = 1, $perPage = 10)
    {
        // Realiza la solicitud a la API de Unsplash
        $response = $this->client->get("https://api.unsplash.com/search/photos", [
            'query' => [
                'query' => $query,
                'page' => $page,
                'per_page' => $perPage,
                'client_id' => $this->accessKey,
            ],
            'verify' => false,  // Desactiva la verificación SSL
        ]);

        // Decodifica la respuesta JSON y la retorna
        return json_decode($response->getBody()->getContents(), true);
    }
}

