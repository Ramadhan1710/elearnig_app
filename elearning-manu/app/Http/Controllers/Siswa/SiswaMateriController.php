<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\MataPelajaran;
use App\Models\Materi;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SiswaMateriController extends Controller
{
    public function show($id)
    {
        // Ambil data materi berdasarkan pelajaran_id
        $materi = Materi::where('id', $id)->first();
        $mapel = MataPelajaran::where('id' ,$materi->pelajaran_id)->first();
        // dd($mapel);

        return Inertia::render('Siswa/SiswaDetailMateri', [
            'materi' => $materi, 'mapel' => $mapel
        ]);
    }
}
