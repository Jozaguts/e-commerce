<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products =[
            [
                'name' => 'product uno',
                'slug' => Str::slug('product uno','-'),
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, magni!',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'product dos',
                'slug' => Str::slug('product dos','-'),
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, magni!',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'product tres',
                'slug' => Str::slug('product tres','-'),
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, magni!',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'product cuatro',
                'slug' => Str::slug('product cuatro','-'),
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, magni!',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ]
        ];
        $url = 'https://via.placeholder.com/640x360';
        foreach($products as $product){
            $tempMedia = Product::create($product);
            $tempMedia->addMediaFromUrl($url)
                ->toMediaCollection('products');
        }
    }
}
