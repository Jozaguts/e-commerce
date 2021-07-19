<?php


namespace App\Repository;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function toggleStatus(string $slug);
    public function all();
    public function save(object $attributes);
    public function update($identifier, object $attributes);
}
