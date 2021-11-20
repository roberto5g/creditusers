<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class UserController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        $users['data'] = User::with('address')->orderBy('id','DESC')->get();
        return response()->json($users);
    }

    public function create(Request $request)
    {

        $user = User::create($request->all());

        if($request->cep){
            $request['user_id'] = $user->id;
            $user = Address::create($request->all());
        }
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::with('address')->findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {

        $user = User::findOrFail($id);
        $user->fill($request->all());
        $user->save();

        $address = Address::where('user_id',$user->id)->first();
        if($address){
            $address->fill($request->all());
            $address->save();
        } else {
            $request['user_id'] = $user->id;
            $address = Address::create($request->all());
        }

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json('User removed successfully');
    }
}
