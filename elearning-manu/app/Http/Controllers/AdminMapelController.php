<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Siswa;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class AdminMapelController extends Controller
{
    public function index()
    {
        $mapel = MataPelajaran::with('guru.user:id,name', 'kelas')->get();
        return Inertia::render('Admin/AdminMapel', ['mapel' => $mapel]);
    }

    public function create()
    {
        $guru = Guru::with('user')->get();
        $kelas = kelas::all();
        // dd($kelas->all(), $guru->all());
        return Inertia::render('Admin/AdminMapelCreate', [
            'guru' => $guru, 'kelas' => $kelas
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'mapel' => 'required',
            'guru_id' => 'required',
            'kelas_id' => 'required',
        ])->validate();

        MataPelajaran::create([
            'mapel' => $request->input('mapel'),
            'guru_id' => $request->input('guru_id'),
            'kelas_id' => $request->input('kelas_id')
        ]);

        return Redirect::route('admin.mapel.index')->with('message', 'Mata Pelajaran berhasil ditambahkan');
    }

    public function show($id)
    {
        $mapel = MataPelajaran::where('id', $id)->with('kelas', 'guru.user')->first();
        $siswa = Siswa::where('kelas_id', $mapel->pelajaran_id)->with('user')->get();

        // dd($siswa);
        return Inertia::render('Admin/AdminMapelShow', [
            'mapel' => $mapel,
            'siswa' => $siswa,
        ]);
    }

    public function edit(MataPelajaran $id)
    {
        $mapel = $id;
        $guru = Guru::with('user')->get();
        $kelas = kelas::all();

        return Inertia::render('Admin/AdminMapelEdit', [
            'mapel' => $mapel, 'guru' => $guru, 'kelas' => $kelas
        ]);
    }

    public function update(Request $request, $id)
    {
        $mapel = MataPelajaran::find($id);

        Validator::make($request->all(), [
            'mapel' => 'required',
            'guru_id' => 'required',
            'kelas_id' => 'required',
        ])->validate();

        // Temukan dan perbarui mata pelajaran
        if ($request->filled('mapel') && $request->mapel !== $mapel->mapel) {
            $mapel->mapel = $request->input('mapel');
        }

        if ($request->filled('guru_id') && $request->guru_id !== $mapel->guru_id) {
            $mapel->guru_id = $request->input('guru_id');
        }

        if ($request->filled('kelas_id') && $request->kelas_id !== $mapel->kelas_id) {
            $mapel->kelas_id = $request->input('kelas_id');
        }

        $mapel->save();

        return Redirect::route('admin.mapel.index')->with('message', 'Mapel berhasil diupdate');
    }

    public function destroy($id)
    {
        $mapel = MataPelajaran::findOrFail($id);
        $materi = $mapel->materi;

        // Check and delete materi if it exists
        optional($materi)->each(function ($materi) {
            $materi->delete();
        });

        // Delete the mapel
        $mapel->delete();

        return Redirect::route('admin.mapel.index')->with('message', 'Mapel berhasil dihapus');
    }
}
