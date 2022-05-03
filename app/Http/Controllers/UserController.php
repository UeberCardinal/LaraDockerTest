<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Auth\Authenticatable;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function userRole()
    {
        return User::getUserRole();
    }


}
