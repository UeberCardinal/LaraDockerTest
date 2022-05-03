<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Role extends Model
{
    use HasFactory;


    public function users()
    {
        return $this->hasMany(User::class);
    }

    public static function getCurrentRole()
    {
        if (Auth::check()) {
            return \Auth::user()->role()->name;
        } else {
            return 'guest';
        }
    }
}
