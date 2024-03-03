<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Guru extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('guru')->insert([
            'nip_guru' => '112098101',
            'jns_kelamin_guru' => 'Laki-Laki',
            'no_telp_guru' => '081917926409',
            'alamat_guru' => 'jl. Mawar 78',
            'jabatan_guru' => 'guru',
            'status_guru' => 'aktif',
            'user_id' => '5',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
