<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MataPelajaran extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mata_pelajaran';
    protected $fillable = [
        'mapel',
        'kelas_id',
        'guru_id',
    ];

    /**
     * Mendapatkan kelas terkait dengan mata pelajaran.
     */
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    /**
     * Mendapatkan guru terkait dengan mata pelajaran.
     */
    public function guru()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function materi()
    {
        return $this->hasMany(Materi::class, 'pelajaran_id');
    }

}
