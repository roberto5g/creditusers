<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class ChekCpfEmailController extends BaseController
{
    public function chek($option, Request $request)
    {
        if($option == 'cpf'){
            $client = User::where('cpf',$request['cpf'])->first();

            if ($client) {
                if($request->client_id == $client->id){
                    $message = "true";
                } else {
                    $message = "O CPF já cadastrado.";
                }
            } else {
                $message = "true";
            }
        } else if($option == 'email'){
            $client = User::where('email',$request['email'])->first();
            if ($client) {
                if($request->client_id == $client->id){
                    $message = "true";
                } else {
                    $message = "Email já cadastrado.";
                }
            } else {
                $message = "true";
            }
        }
        return response()->json($message);

    }

}
