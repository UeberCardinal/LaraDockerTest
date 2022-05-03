<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" href="{{asset('css/popup.css')}}">
    <title>Document</title>
</head>
<body>
<div class="container d-flex justify-content-center h-100">

    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">

                    <h3 class="mb-5">Register</h3>
                    <form method="post" action="{{route('register_create')}}">
                        @csrf
                    <div class="form-outline mb-4">
                        <input type="text" name="name" id="typeEmailX-2" class="form-control form-control-lg">
                        <label class="form-label" for="typeEmailX-2" style="margin-left: 0px;">Name</label>
                        <div class="form-notch"><div class="form-notch-leading" style="width: 9px;">
                            </div><div class="form-notch-middle" style="width: 40px;">
                            </div><div class="form-notch-trailing"></div></div></div>

                    <div class="form-outline mb-4">
                        <input type="email" name="email" id="typeEmailX-2" class="form-control form-control-lg">
                        <label class="form-label" for="typeEmailX-2" style="margin-left: 0px;">Email</label>
                        <div class="form-notch"><div class="form-notch-leading" style="width: 9px;">
                            </div><div class="form-notch-middle" style="width: 40px;">
                            </div><div class="form-notch-trailing"></div></div></div>

                    <div class="form-outline mb-4">
                        <input type="password" name="password" id="typePasswordX-2" class="form-control form-control-lg">
                        <label class="form-label" for="typePasswordX-2" style="margin-left: 0px;">Password</label>
                        <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div>
                            <div class="form-notch-middle" style="width: 64px;"></div>
                            <div class="form-notch-trailing"></div></div></div>

                    <button class="btn btn-primary btn-lg btn-block" type="submit">Register</button>
                    </form>
                </div>
            </div>

    </div>

</div>

</body>
</html>

