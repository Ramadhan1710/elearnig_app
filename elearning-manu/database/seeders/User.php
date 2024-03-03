<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert(
            [
                [
                    'name' => 'Ramadhan',
                    'email' => 'rama@gmail.com',
                    'password' => Hash::make('ramadhan'),
                    'role' => 'guru',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
                [
                    'name' => 'Bayu',
                    'email' => 'bayu@gmail.com',
                    'password' => Hash::make('bayuhadi'),
                    'role' => 'guru',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
                [
                    'name' => 'Argya',
                    'email' => 'argya@gmail.com',
                    'password' => Hash::make('argyadwi'),
                    'role' => 'siswa',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
                [
                    'name' => 'Rama',
                    'email' => 'ramadhan@gmail.com',
                    'password' => Hash::make('12345678'),
                    'role' => 'siswa',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            ]


        );
    }
}
