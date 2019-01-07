<?php

namespace App\Http\Middleware;

use Closure;

class isCook
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = \Auth::user();
        if ($user->isCook())
            return $next($request);
        else
            return response("Forbidden action.", 403);
    }
}
