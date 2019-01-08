<?php

namespace App\Http\Middleware;

use Closure;

class isBlocked
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = \Auth::user();
        if ($user->blocked)
            return response("Forbidden action.", 401);
        else
            return $next($request);
    }
}
