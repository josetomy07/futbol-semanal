<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherApi extends Controller
{
    public function index($city)
    {
        // API URL with query parameters
        $url = "http://api.weatherapi.com/v1/current.json?key=".env('API_WEATHER_KEY')."&q=".$city;
        // Call the API and get the response
        $response = file_get_contents($url);

        // Check if the response is valid
        if ($response !== false) {
            return response($response, 200);
        } else {
            $error = "Error fetching the data.";
            $request = Request::create('/store', 'POST', [
                "error" => $error
            ]);
            // Instantiate the target controller or use dependency injection
            $errorLogController = new ErrorLogsController();

            // Call the store method on the controller
            $errorLogController->store($request);
            return response(json_encode(["error" => $error], JSON_PRETTY_PRINT), 200);
        }
    }
}
