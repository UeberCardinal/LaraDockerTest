<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Request;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'article', 'status', 'data'];
    protected $casts = ['data' => 'array'];

    public function scopeAvailableProducts($query)
    {
        return $query->where('status', 'available');
    }

}
