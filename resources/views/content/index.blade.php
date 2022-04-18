@extends('layout')
@section('content')
    <div class="table">

        <table id="products_table" style="color:#808080" class="w-100">
            <thead>
            <tr>
                <td class="p-3">Артикул</td>
                <td class="p-3">Название</td>
                <td class="p-3">Статус</td>
                <td class="p-3">Атрибуты</td>
            </tr>
            </thead>
            <tbody id="tbody_products_table">

        {{--    @foreach($products as $product)

                <tr onclick="showProductForm({{$product->id, $product->getActionUrl()}})" class="table_product" id="{{$product->id}}">
                    <td class="p-3 bg-white">{{$product->article}}</td>
                    <td class="p-3 bg-white">{{$product->name}}</td>
                    <td class="p-3 bg-white">{{$product->status}}</td>
                    <td class="p-3 bg-white">
                        @if(!is_null($product->data))
                            @foreach($product->data as $key => $value)
                               {{$key.': '.$value}}<br>
                            @endforeach
                        @endif
                    </td>
                </tr>
            @endforeach--}}
            </tbody>
        </table>
    </div>
{{ $products->links('pagination::bootstrap-5') }}

@endsection
