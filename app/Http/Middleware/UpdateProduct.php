<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UpdateProduct
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->getRequestUri() == '/public/product/'.$request->id && \Auth::user()->isAdmin()) {
            dd(111);
            return $next($request);
        } elseif ($request->getMethod() == 'POST'  && \Auth::user()->isAdmin() ) {
            dd(222);
            return $next($request);
        }
        return response()->json('error', 500);
    }
}
