<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Request;

class Product extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = ['name', 'article', 'status', 'data'];
    protected $casts = ['data' => 'array'];

    public function scopeAvailableProducts($query)
    {
        return $query->where('status', 'available');
    }

}
