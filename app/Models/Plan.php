<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        "name", "description", "value", "icon", "color", "user_id"
    ];
}
