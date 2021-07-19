<?php


namespace App\Repository\Eloquent;


use App\Models\Product;
use App\Repository\ProductRepositoryInterface;
use Illuminate\Support\Str;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }
    public function all()
    {

        $products = $this->model::paginate(9);
        $products->map(function($item) {
            $item['media_url'] = $item->getFirstMediaUrl('products') ?? 'https://via.placeholder.com/640x360';
            return $item;
        });

        return $products;
    }
    public function toggleStatus(string $slug)
    {
        $product = $this->model->where('slug',$slug)->first();
        $product->status = !$product->status;
        $product->save();
        return $product;
    }
    public function save(object $attributes)
    {
        $product = $this->model::create([
            'name' => $attributes->get('name'),
            'description' => $attributes->get('description'),
            'price' => $attributes->get('price'),
            'status' => $attributes->get('status'),
            'slug' => Str::slug($attributes->get('name'))
        ]);

        if($attributes->hasFile('image')) {
            $product->addMediaFromRequest('image')
                ->toMediaCollection('products');
        }
        return $product;
    }
    public function update($identifier, object $attributes)
    {
        $product = $this->findBy('slug', $identifier);

        $product->update([
            'name' => $attributes->get('name'),
            'description' => $attributes->get('description'),
            'price' => $attributes->get('price'),
            'status' => $attributes->get('status'),
            'slug' =>  Str::slug($attributes->get('name')),
        ]);
        if($attributes->hasFile('image')) {
            $product->addMediaFromRequest('image')
                ->toMediaCollection('products');
        }
        return $product;
    }
}
