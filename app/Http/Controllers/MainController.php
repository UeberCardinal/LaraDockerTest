<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        $products = Product::paginate(10);

        return view('content.index', compact('products'));
    }

    public function popup()
    {
        return view('content.popup');
    }
}
