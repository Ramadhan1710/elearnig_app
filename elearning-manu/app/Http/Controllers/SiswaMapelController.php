<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaMapelController extends Controller
{
    public function index()
    {
        // Mendapatkan informasi siswa berdasarkan user saat ini
        $siswa = Siswa::where('user_id', auth()->user()->id)->first();

        if (!$siswa) {
            // Handle jika siswa tidak ditemukan
            return response()->json(['error' => 'siswa not found'], 404);
        }

        // Mendapatkan mata pelajaran yang diajar oleh guru tersebut
        $mapel = $siswa->kelas->mata_pelajaran()
            ->with(['guru.user:id,name,email'])
            ->get();

            // dd($mapel);
        return Inertia::render('Siswa/SiswaMapel', ['mapel' => $mapel]);
    }

    public function show($mataPelajaranId)
    {
        // Mendapatkan informasi siswa berdasarkan user saat ini
        $siswa = Siswa::where('user_id', auth()->user()->id)->first();

        if (!$siswa) {
            // Handle jika siswa tidak ditemukan
            return response()->json(['error' => 'siswa not found'], 404);
        }

        // Mendapatkan materi berdasarkan mata pelajaran
        $materi = $siswa->kelas->mata_pelajaran()
            ->findOrFail($mataPelajaranId)
            ->materi()
            ->get();

        // $mapel = $siswa->kelas->mata_pelajaran()->get();

        // dd($mapel);

            // dd($materi);
        // Pass the $materi data to the view
        return Inertia::render('Siswa/SiswaMapelShow', ['materi' => $materi ]);
    }
}
