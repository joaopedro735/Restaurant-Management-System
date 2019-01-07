<?php

namespace App\Http\Middleware;

use Closure;

class isCashierOrManager
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
        if ($user->isCashier() || $user->isManager())
            return $next($request);
        return response("Forbidden action.",403);
    }
}
