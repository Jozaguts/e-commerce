<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'email|unique:users,email|unique:users,email,'.$this->user()->id,
            'name' => 'string',
            'password' => 'string',
            'password_confirm' => 'same:password'
        ];
    }
    public function messages()
    {
        return [
          'email.unique' => 'the e-mail has already been taken'
        ];
    }
}
