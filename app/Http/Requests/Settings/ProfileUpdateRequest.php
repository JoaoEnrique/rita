<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'user_name' => [
                'required',
                'string',
                'max:20',
                Rule::unique(User::class)->ignore($this->user()->id),
                'regex:/^[^@\s?#&%\/:;=\'"{}\[\]\\\\|+]+$/'
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'user_name.regex' => 'O nome de usuário não pode conter os seguintes caracteres: ? # & % / : ; = \' " { } [ ] \\ | +',
            'user_name.required' => 'O campo nome de usuário é obrigatório.',
            'user_name.unique' => 'Este nome de usuário já está em uso.',
            'email.unique' => 'Este email já está em uso.',
        ];
    }

}
