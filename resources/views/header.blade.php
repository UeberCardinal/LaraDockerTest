<div class="d-flex w-100 ">
        <div class="d-flex justify-content-between w-100">
            <div class="m-3" style="border-bottom: 3px red solid; color: red">ПРОДУКТЫ</div>
            <div class="d-flex">
                @guest()
                    <div class="align-items-center d-flex p-3">
                        <div style="margin-right: 10px"><a href="{{route('register')}}">Регистрация</a></div>
                        <div><a href="{{route('login')}}">Войти</a></div>
                    </div>
                @endguest
                @auth()
                        <div class="align-items-center d-flex p-3">
                        <div style="margin-right: 10px"><a href="{{route('logout')}}">Выйти</a></div>

                        </div>
                        <div style="font-size: 12px" class="m-3 opacity-50 text-muted">{{Auth::user()->name}}</div>
                @endauth



            </div>

        </div>
</div>

