<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /* protected function authenticated(Request $request, $user)
    {               
        // implement your user role retrieval logic, for example retrieve from `roles` database table
        $role = DB::table('users')->select('type')->where('id', $user->id);

        // grant scopes based on the role that we get previously
        if ($role == 'cook') {
            $request->request->add([
                'scope' => 'manage-orders' // grant manage order scope for user with admin role
            ]);
        } else {
            $request->request->add([
                'scope' => 'read-only-order' // read-only order scope for other user role
            ]);
        }

        // forward the request to the oauth token request endpoint
        $tokenRequest = Request::create(
            '/oauth/token',
            'post'
        );
        
        return Route::dispatch($tokenRequest);
    } */
}
