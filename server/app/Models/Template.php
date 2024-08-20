<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'author_id',
        'name',
        'html',
        'blade',
        'type',
        'thumbnail'
    ];

    protected $hidden = [
        'author_id',
        'path',
    ];
}
