<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Kelas extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kelas')->insert([
            'nama_kelas' => 'XII',
            'program_studi' => 'MIPA', 
            'tahun_ajaran' => '2023/2024',
            'wali_kelas' => 'John Doe', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
