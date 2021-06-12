<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserController extends Controller
{

    public function index()
    {
        try{
            return response()->json( ['users' => User::all()] );
        }catch(Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }


    public function store(UserStoreRequest $request): \Illuminate\Http\JsonResponse
    {
        try {
            $password   = Hash::make($request->get('password'));
            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => $password
            ]);
            return response()->json([
                'user' => $user,
                'message' => 'user was created successfully'
            ],201);
        }catch(Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }

    public function show(User $user)
    {
        return $user;
    }


    public function update(UserUpdateRequest $request, User $user): \Illuminate\Http\JsonResponse
    {
        try {
            if($request->has('password')) {
                $passwordHashed = Hash::make($request->get('password'));
                $request->password = $passwordHashed;
            }
            $user->update($request->all());

            return response()->json([
                'user' => $user,
                'message' =>'The user was updated successfully'
            ],200);
        }catch (Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }

    }


    public function destroy($id)
    {
        echo 'destroy';
    }
}
