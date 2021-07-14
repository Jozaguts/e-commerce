<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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


    public function store(UserStoreRequest $request): JsonResponse
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
                'message' => 'user was created successfully',
                'success' => true
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


    public function update(UserUpdateRequest $request, User $user): JsonResponse
    {

        try {

            if($request->has('password')) {
                $user->update(['password'=> Hash::make($request->get('password'))]);
            }

            $user->update($request->only('email','name'));

            return response()->json([
                'user' => $user,
                'message' =>'The user was updated successfully',
                'success' => true
            ],200);
        }catch (Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], 422 );
        }

    }


    public function destroy(User $user): JsonResponse
    {
        try {
           $user->delete();
            return response()->json([
                'message' =>'The user was deleted successfully',
                'success' => true
            ],200);
        }catch (ModelNotFoundException  $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }
}
