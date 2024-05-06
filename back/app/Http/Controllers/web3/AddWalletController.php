<?php

namespace App\Http\Controllers\Controllers\web3;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Response;

class AddWalletController extends Controller
{

    public function store(Request $request)
    {
        // Find the user by email
        $user = User::where('email', $request->cookie('user_email'))->first();

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Add the wallet to the database for the user
        $wallet = new Wallet();
        $wallet->user_id = $user->id;
        $wallet->wallet = $request->input('wallet');
        $wallet->save();

        return response()->json(['message' => 'Wallet added successfully'], 201);
    }
    
}
