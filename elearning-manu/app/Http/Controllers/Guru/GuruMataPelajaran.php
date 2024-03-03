<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use App\Models\MataPelajaran;
use Inertia\Inertia;

class GuruMataPelajaran extends Controller
{
    public function index()
    {
        // Mendapatkan informasi guru berdasarkan user saat ini (asumsi ada relasi di model Guru ke User)
        $guru = Guru::where('user_id', auth()->user()->id)->first();

        if (!$guru) {
            // Handle jika guru tidak ditemukan
            return response()->json(['error' => 'Guru not found'], 404);
        }

        // Mendapatkan mata pelajaran yang diajar oleh guru tersebut
        $mapel = MataPelajaran::where('guru_id', $guru->id)->with('guru', 'kelas')->get();

        return Inertia::render('Guru/GuruMapel', ['mapel' => $mapel]);
    }

    public function show(MataPelajaran $mataPelajaran)
    {
        $mapeldata = MataPelajaran::with('kelas.siswa.user')
            ->where('id', $mataPelajaran->id)
            ->first();

        // dd($data);
        return Inertia::render('Guru/GuruMapelShow', ['mapeldata' => $mapeldata]);
    }

    
}
