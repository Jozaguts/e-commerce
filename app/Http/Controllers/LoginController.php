<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request): JsonResponse
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

    public function logout(Request $request): JsonResponse
    {
        try {
            $accessToken = auth()->user()->token();
            $token= $request->user()->tokens->find($accessToken);
            $token->revoke();
            $token->delete();
            return response()->json(['message' => 'You have been successfully logged out.', 'success' => true], 200);
        }catch (\Exception $e){
            return response()->json(['message' => $e->getMessage(), 'success' => false], $e->getCode());
        }
    }
}
