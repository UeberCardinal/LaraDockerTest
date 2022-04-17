<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
   <link rel="stylesheet" href="{{asset('css/popup.css')}}">
    <title>Document</title>
</head>
<body>
<div class="wrapper d-flex">
    <aside id="sidebar">
        @include('sidebar')
    </aside>
    <main class="d-flex flex-column w-100">
        <div id="header" class="w-100">
            @include('header')
        </div>
        <div style="background-color: #f5f5f5" class="container h-100 p-0">
            <div class="row d-flex justify-content-between">
                <div class="col-sm-7 col-md-7 col-lg-7">
                    @yield('content')
                    @include('content.popup.popup')
                    @include('content.popup.show')
                </div>
                <div class="col-sm-5 col-md-5 col-lg-5 justify-content-end d-flex">
                    <div class="m-4">
                        <button id="addBtn" style="color: white; background-color: #0dcaf0; width: 180px; height: 35px; border-radius: 11px; border: 0">
                            Добавить
                        </button>
                    </div>

                </div>


            </div>

        </div>


    </main>
</div>

<script src="{{asset('js/jquery-3.6.0.js')}}"> </script>
<script src="{{asset('js/popup.js')}}"> </script>

</body>
</html>
