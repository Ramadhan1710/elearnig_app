<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Siswa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'siswa';
    protected $fillable = [
        'user_id',
        'nis_siswa',
        'nisn_siswa',
        'kelas_id',
        'jns_kelamin_siswa',
        'tahun_ajaran_masuk',
    ];

    /**
     * Mendapatkan data user terkait dengan siswa.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id','id');
    }

    /**
     * Mendapatkan kelas sekarang siswa.
     */
    public function Kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id','id');
    }

    // /**
    //  * Memeriksa izin akses siswa berdasarkan semester dan tahun ajaran.
    //  *
    //  * @param string $semester
    //  * @param string $tahunAjaran
    //  * @return bool
    //  */
    // public function hasAccessToSemester($semester, $tahunAjaran)
    // {
    //     // Memisahkan tahun ajaran menjadi tahun awal dan akhir.
    //     $tahunAjaranParts = explode('/', $this->tahun_ajaran);

    //     // Memastikan array memiliki dua elemen sebelum mencoba mengaksesnya.
    //     if (count($tahunAjaranParts) === 2) {
    //         list($tahunAjaranAwal, $tahunAjaranAkhir) = $tahunAjaranParts;

    //         // Logika untuk semester genap.
    //         if ($semester === 'genap' && in_array($this->kelas_kode->range_kelas, ['X', 'XI', 'XII'])) {
    //             return $this->created_at >= $tahunAjaranAwal . '-01-01' && $this->created_at <= $tahunAjaranAkhir . '-06-30';
    //         }

    //         // Logika untuk semester ganjil atau kondisi lain sesuai kebutuhan.
    //         if ($semester === 'ganjil' && in_array($this->kelas_kode->range_kelas, ['X', 'XI', 'XII'])) {
    //             return $this->created_at >= $tahunAjaranAwal . '-07-01' && $this->created_at <= $tahunAjaranAkhir . '-12-31';
    //         }
    //     }

    //     // Jika tidak memenuhi kondisi di atas atau tidak dapat memisahkan tahun ajaran, siswa tidak memiliki akses.
    //     return false;
    // }
}
