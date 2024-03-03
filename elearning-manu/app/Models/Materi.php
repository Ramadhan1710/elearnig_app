<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Materi extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'materi';
    protected $fillable = [
        'nama',
        'pelajaran_id',
        'deskripsi_materi',
        'file_materi',
        'video'
    ];

    /**
     * Mendapatkan pelajaran terkait dengan materi.
     */
    public function mata_pelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'pelajaran_id');
    }
}
