<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use App\Repository\ProductRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    private ProductRepositoryInterface $productRepository;
    const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/640x360';
    //TODO pagination on front
    //TODO implement API RESOURCE
    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository =  $productRepository;
    }
    public function index(Request $request): JsonResponse
    {
        try {

          $products = $this->productRepository->all();
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
           $product = $this->productRepository->save($request);
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
    public function show(Product $product): JsonResponse
    {
        try {
            $response = [];
            $response['product'] = $product;
            $response['media'] =  $product->getFirstMediaUrl('products') ?? self::IMAGE_PLACEHOLDER;
            return  response()->json($response);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], 400 );
        }
    }
    public function update(ProductUpdateRequest $request, $slug): JsonResponse
    {
        try{
            $response = [];
            $product = $this->productRepository->update($slug,$request);
            $response['media'] =  $product->getFirstMediaUrl('products') ?? self::IMAGE_PLACEHOLDER;
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
    public function toggleStatus($slug): JsonResponse
    {
        try{
            $response = [];
            $product = $this->productRepository->toggleStatus($slug);
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
    public function destroy($slug): JsonResponse
    {
        try {
           $response = $this->productRepository->destroy('slug', $slug);
            return response()->json($response,200);
        }catch(Exception $e){
            return response()->json( [
                'message' => $e->getMessage()
            ], $e->getCode() );
        }
    }
}
