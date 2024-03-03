<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Materi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class AdminKelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::all();
        return Inertia::render('Admin/AdminKelas', ['kelas' => $kelas]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKelasCreate');
    }

    public function show($id)
    {
        $kelas = Kelas::where('id', $id)->first();
        $siswa = Siswa::where('kelas_id', $kelas->id)->with('user')->get();

        // dd($kelas);
        return Inertia::render('Admin/AdminKelasShow', [
            'kelas' => $kelas,
            'siswa' => $siswa,
        ]);
    }


    public function store(Request $request)
    {
        Kelas::create([
            'range_kelas' => $request->input('range_kelas'),
            'program_studi' => $request->input('program_studi'),
            'tahun_ajaran' => $request->input('tahun_ajaran'),
            'wali_kelas' => $request->input('wali_kelas'),
        ]);

        return Redirect::route('admin.kelas.index')->with('message', 'kelas berhasil ditambahkan');
    }

    public function edit(Kelas $id)
    {
        $kelas = $id;

        return Inertia::render('Admin/AdminKelasEdit', [
            'kelas' => $kelas
        ]);
    }

    public function update(Request $request, $id)
    {
        $kelas = Kelas::find($id);

        Validator::make($request->all(), [
            'range_kelas' => 'required',
            'program_studi' => 'required',
            'tahun_ajaran' => 
                'required',
            'wali_kelas' => 'required',
        ])->validate();
        
        // Hanya menyimpan jika ada perubahan
        if ($request->filled('range_kelas') && $request->range_kelas !== $kelas->range_kelas) {
            $kelas->range_kelas = $request->input('range_kelas');
        }

        if ($request->filled('program_studi') && $request->program_studi !== $kelas->program_studi) {
            $kelas->program_studi = $request->input('program_studi');
        }

        if ($request->filled('tahun_ajaran') && $request->tahun_ajaran !== $kelas->tahun_ajaran) {
            $kelas->tahun_ajaran = $request->input('tahun_ajaran');
        }

        if ($request->filled('wali_kelas') && $request->wali_kelas !== $kelas->wali_kelas) {
            $kelas->wali_kelas = $request->input('wali_kelas');
        }

        // Hanya menyimpan jika ada perubahan
        $kelas->save();

        return Redirect::route('admin.kelas.index')->with('message', 'Kelas berhasil diupdate');
    }
    public function destroy($id)
    {
        $kelas = Kelas::findOrFail($id);

        $kelas->delete();

        optional($kelas->mapel)->each(function ($mapel) {

            optional($mapel->materi)->each(function ($materi) {
                $materi->delete();
            });

            $mapel->delete();
        });



        return Redirect::route('admin.kelas.index')->with('message', 'Kelas berhasil dihapus');
    }
}
