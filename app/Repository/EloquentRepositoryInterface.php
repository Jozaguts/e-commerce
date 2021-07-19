<?php


namespace App\Repository;

interface EloquentRepositoryInterface
{
    public function create(array $attributes);
    public function destroy($param, $value);
    public function findBy($param, $value);
}
