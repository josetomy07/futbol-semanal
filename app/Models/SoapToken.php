<?php

// app/Models/SoapToken.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoapToken extends Model
{
    use HasFactory;
    protected $fillable = [
        'token',
        'sign',
        'expiration',
    ];
}
