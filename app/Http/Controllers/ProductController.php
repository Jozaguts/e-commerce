<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    public function index(Request $request) {
        try {
          $products =  Product::paginate(9);
          $products->map(function($item) {
             $item['media_url'] = $item->getFirstMediaUrl('products') ?? 'https://via.placeholder.com/640x360';
             return $item;
          });

          return response()->json($products);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], 400 );
        }


    }
    public function store(ProductStoreRequest $request): JsonResponse
    {
       try{
           $response = [];
           $product = Product::create([
               'name' => $request->get('name'),
               'description' => $request->get('description'),
               'price' => $request->get('price'),
               'status' => $request->get('status'),
               'slug' => Str::slug($request->get('name'))
           ]);

           if($request->hasFile('image')) {

               $product->addMediaFromRequest('image')
                   ->toMediaCollection('products');
            }
           $response['product'] = $product;
           $response['message'] = 'Product was created successfully';
           $response['success'] = true;
           return response()->json($response);
       }catch (Exception $e){
           Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
           return response()->json( [
               'message' => $e->getMessage()
           ], 400);
       }
    }
    public function show(Product $product)
    {
        try {
//            Todo remover public_url y solo dejar ['media']
            $response = [];
            $response['product'] = $product;
            $response['media'] =  $product->getFirstMediaUrl('products') ?? 'https://via.placeholder.com/640x360';
            return  response()->json($response);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], 400 );
        }
    }
    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        try{
            $response = [];
            $product->update([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'price' => $request->get('price'),
                'status' => $request->get('status'),
                'slug' =>  Str::slug($request->get('name')),
            ]);
            if($request->hasFile('image')) {
                $product->addMediaFromRequest('image')
                    ->toMediaCollection('products');
//                $product->getMedia('products')->count();

            }

            $response['media'] =  $product->getFirstMediaUrl('products') ?? 'https://via.placeholder.com/640x360';
            $response['product'] = $product;
            $response['success'] = true;
            $response['message'] ='Product was uploaded successfully';
            return response()->json($response);

        }catch (Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ],  401 );
        }
    }
    public function toggleStatus(Product $product): JsonResponse
    {
        try{
            $response = [];
            $product->status = !$product->status;
            $product->save();
            $response['message'] = 'Status was changed successfully';
            $response['product'] = $product;
            return response()->json($response,201);
        }catch (Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ],  401 );
        }
    }
    public function destroy(Product $product): JsonResponse
    {
        try {
            $product->delete();
            return response()->json(['message' => 'Product was deleted successfully'],200);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }
}
