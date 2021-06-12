<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    public function index() {
        try {
           return  Product::with('media')->simplePaginate(60);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }


    }
    public function store(ProductStoreRequest $request): JsonResponse
    {
       try{
           $product = Product::create([
               'name' => $request->get('name'),
               'description' => $request->get('description'),
               'price' => $request->get('price'),
               'status' => $request->get('status'),
               'slug' => Str::slug($request->get('name'))
           ]);

           if($request->hasFile('image')) {
               $product->addMedia($request->image)->toMediaCollection('products');
           }
           return response()->json( [
               'message' => $product] );

       }catch (Exception $e){
           Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
           return response()->json( [
               'message' => $e->getMessage()
           ], $e->getCode() );
       }
    }
    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        try{

            $request->request->add(['slug' => Str::slug($request->get('name'))]);
            $product->update($request->all());

            if($request->hasFile('image')) {
                $productMedia = $product->getMedia('products');
                $productMedia[0]->delete();
                $product->addMedia($request->image)->toMediaCollection('products');
            }
            return response()->json( [
                'message' => $product] );

        }catch (Exception $e){
            Log::error($e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine(), 'trace' => $e->getTraceAsString()]);
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
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
