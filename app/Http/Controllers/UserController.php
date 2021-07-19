<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    //TODO implement API RESOURCE
    //TODO implement repository pattern
    public function index(): JsonResponse
    {
        try{
            return response()->json(
                [
                'data'=> new UserCollection(User::all()),
                'message' => 'user was loaded successfully',
                'success' => true
            ]);
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

            return response()->json(
                [
                    'data'=>   new UserResource($user),
                    'message' => 'user was loaded successfully',
                    'success' => true
                ]);

        }catch(Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }

    public function show(User $user)
    {
        try{
            return new UserResource($user);
        }catch(Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }


    public function update(UserUpdateRequest $request, User $user)
    {
        try {
            if($request->has('password')) {
                $user->update(['password'=> Hash::make($request->get('password'))]);
            }

            $user->update($request->only('email','name'));

            return  response()->json([
                    'data'=>   new UserResource($user),
                    'message' => 'user was loaded successfully',
                    'success' => true
                ]);
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
