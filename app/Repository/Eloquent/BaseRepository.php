<?php


namespace App\Repository\Eloquent;


use App\Repository\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements EloquentRepositoryInterface
{

    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }
    public function destroy($param, $value)
    {
        $this->model->where($param, $value)
            ->delete();
        return ['message' => 'Product was deleted successfully'];
    }

    public function findBy($param, $value)
    {
        return $this->model->where($param, $value)->first();
    }
}
