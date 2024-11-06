<?php

namespace App\Http\Controllers;

use App\Services\UnsplashService;
use Illuminate\Http\Request;

class UnsplashController extends Controller
{
    protected $unsplashService;

    public function __construct(UnsplashService $unsplashService)
    {
        $this->unsplashService = $unsplashService;
    }

    public function search(Request $request)
    {
        //dd('inner list');
        $query = $request->input('query', 'nature'); // Default query: 'nature'
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);

        $photos = $this->unsplashService->searchPhotos($query, $page, $perPage);

        return response()->json($photos);
    }
}
