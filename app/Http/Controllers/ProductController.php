<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Jobs\ProductWasAdded;
use App\Mail\TestMailable;
use App\Models\Product;
use App\Notifications\SuccessAddProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PhpParser\JsonDecoder;
use function MongoDB\BSON\toJSON;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::availableProducts()->get();
        return response()->json($products, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProductRequest $request)
    {
        $params = $request->all();
        try {
            if ($request->has('data')) {
                $data = $request->data;
                $params['data'] = $data;
                $product = Product::create($params);
                \Notification::route('mail', config('products.email'))
                    ->notify(new SuccessAddProduct($product->name));

                    return response()->json($product->only('article', 'name', 'status', 'data'), 200);
                }
        } catch (\Exception $exception) {
            return response($exception->getMessage(), 500);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return response()->json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $product->update($request->all());
        return response()->json('успех', '200');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response('succ');
    }
}
