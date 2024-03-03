<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kelas extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kelas';
    protected $fillable = [
        'range_kelas',
        'program_studi',
        'tahun_ajaran',
        'wali_kelas'
    ];

    /**
     * Mendapatkan daftar siswa dalam kelas.
     */
    public function siswa()
    {
        return $this->hasMany(Siswa::class, 'kelas_id','id');
    }

    public function mata_pelajaran()
    {
        return $this->hasMany(MataPelajaran::class, 'kelas_id','id');
    }
}
