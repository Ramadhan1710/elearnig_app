<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guru extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'guru';
    protected $fillable = [
        'nip_guru',
        'jns_kelamin_guru',
        'no_telp_guru',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mata_pelajaran()
    {
        return $this->hasMany(MataPelajaran::class, 'guru_id');
    }

}
