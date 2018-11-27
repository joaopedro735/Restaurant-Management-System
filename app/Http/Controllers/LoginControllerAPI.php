<?php

namespace App\Http\Controllers;

define('YOUR_SERVER_URL', 'http://projeto.dad');
// Check "oauth_clients" table for next 2 values:
define('CLIENT_ID', '2');
define('CLIENT_SECRET','jgVYJdES12rNNFgCAR3yZhFRTV5ZQ2h3VBgJ1GLb');

use Illuminate\Http\Request;

class LoginControllerAPI extends Controller
{
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        $response = $http->post(YOUR_SERVER_URL.'/oauth/token', [
            'form_params' => [
            'grant_type' => 'password',
            'client_id' => CLIENT_ID,
            'client_secret' => CLIENT_SECRET,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => ''
            ],
            'exceptions' => false,
        ]);

        $errorCode= $response->getStatusCode();

        if ($errorCode=='200') {
            return json_decode((string) $response->getBody(), true);
        } else {
            return response()->json(
                ['msg'=>'User credentials are invalid'], $errorCode);
        }
    }

    public function logout()
    {
        \Auth::guard('api')->user()->token()->revoke();
        \Auth::guard('api')->user()->token()->delete();
        return response()->json(['msg'=>'Token revoked'], 200);
    }
}
