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
                'name' => 'Spicy Lime Grilled Shrimp',
                'slug' => Str::slug('Spicy Lime Grilled Shrimp','-'),
                'description' => 'Cajun seasoning and lime juice give plain grilled shrimp an upgrade. This would be the perfect pairing for some  for a zesty summertime meal. ',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'Roast Chicken with Orange Glaze',
                'slug' => Str::slug('Roast Chicken with Orange Glaze','-'),
                'description' => 'Heat oven to 425°F. Remove giblets and neck from chicken. Rinse chicken inside and out with cold running water; drain well...',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'Chicken with Lemon and Pepper',
                'slug' => Str::slug('Chicken Thighs with Lemon and Pepper','-'),
                'description' => '1 Tbsp Extra Virgin Olive Oil 4 Tbsp Butter, Divided 8 Large Chicken Thighs Kosher Salt Poultry Seasoning Seasoning Seasoning or Ground...',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ],
            [
                'name' => 'Spinach and Arugula Salad with Orange',
                'slug' => Str::slug('Spinach and Arugula Salad with Orange','-'),
                'description' => 'In a salad bowl mix the marmalade with the lemon juice, add the olive oil, salt and pepper. Add the greens, orange, onion, salt and pepper...',
                'price' => rand(100,500),
                'status' => rand(0,1),
            ]
        ];
        $images = [
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F05%2F06%2F8049679-2000.jpg',
            'https://dcom-prod.imgix.net/files/wp-content/uploads/2016/12/1482170643-Pollo-Asado-con-Glaseado-de-Naranja-1.jpg?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75',
            'https://dcom-prod.imgix.net/files/wp-content/uploads/2018/05/1528824658-Tamano616PolloLimon.png?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75',
            'https://dcom-prod.imgix.net/files/wp-content/uploads/2015/10/1445220456-d42d6fb7-d9ea-4cb2-8614-30f7447e99d6.jpg?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75',
        ] ;
        foreach($products as $key => $product){
            $tempMedia = Product::create($product);
            $tempMedia->addMediaFromUrl($images[$key])
                ->toMediaCollection('products');
        }
    }
}
