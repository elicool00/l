<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailSender extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'list_id',
        'author_id',
        'template_id',
        'subject',
        'frequency',
        'status',
        'reply_email',
        'sent_at',
    ];
}
