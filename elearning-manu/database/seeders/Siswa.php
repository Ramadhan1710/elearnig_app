<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class Siswa extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('siswa')->insert([
            [
                'user_id' => '15',
                'nis_siswa' => '12345',
                'nisn_siswa' => '67890',
                'no_hp_siswa' => '123456789',
                'jns_kelamin_siswa' => 'Laki-laki',
                'kelas_kode' => 121,
                'kelas_id' => 1,
                'tahun_ajaran_masuk' => '2022/2023'
            ],
        ]);
    }
}

