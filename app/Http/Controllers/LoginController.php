<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->only('email','password');

        if (! Auth::attempt($credentials) ) {
            return response()->json(['message' => 'The credentials you supplied were not correct or did not grant access to this resource'],422);
        }
        $accessToken = Auth::user()->createToken('auth_token')->accessToken;
        return response()->json([
            'user' => Auth::user(),
            'access_token' => $accessToken
        ]);
    }
}
