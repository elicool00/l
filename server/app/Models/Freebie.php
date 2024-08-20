<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Freebie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file',
        'tag',
        'list_id',
        'author_id',
        'description'
    ];

    protected $hidden = [
        'file',
    ];
}
