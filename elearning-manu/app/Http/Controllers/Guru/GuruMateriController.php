<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Materi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GuruMateriController extends Controller
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

        return Inertia::render('Guru/GuruMateri', ['mapel' => $mapel]);
    }

    public function create($pelajaran_id)
    {
        return Inertia::render('Guru/GuruMateriCreate', ['pelajaran_id' => $pelajaran_id]);
    }

    /**
     * Menyimpan materi baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'pelajaran_id' => 'required',
            'deskripsi_materi' => 'required',
            'file_materi' => 'required|file|mimes:pdf,doc,docx,csv,ppt,pptx,txt',
            'video' => 'nullable|string', // Mengubah nama kolom menjadi "video"
        ]);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        // Handle unggah file
        $fileMateri = $request->file('file_materi');
        $fileName = time() . '_' . $fileMateri->getClientOriginalName();

        // Simpan file ke direktori public/uploads (Anda bisa menyesuaikan ini)
        $fileMateri->storeAs('public/uploads', $fileName);

        // Mendapatkan tautan video jika diinputkan
        $video = $request->input('video');

        // Simpan data ke database
        Materi::create([
            'nama' => $request->input('nama'),
            'pelajaran_id' => $request->input('pelajaran_id'),
            'deskripsi_materi' => $request->input('deskripsi_materi'),
            'file_materi' => $fileName,
            'video' => $video,
        ]);

        $pelajaran_id = $request->input('pelajaran_id');

        return Redirect::route('guru.materi.show', $pelajaran_id)->with('message', 'Materi berhasil ditambahkan');
    }

    public function show($pelajaran_id)
    {
        // Ambil data materi berdasarkan pelajaran_id
        $materi = Materi::where('pelajaran_id', $pelajaran_id)->get();
        $mapel = MataPelajaran::where('id', $pelajaran_id)->first();

        return Inertia::render('Guru/GuruMateriShow', [
            'materi' => $materi, 'mapel' => $mapel
        ]);
    }

    public function detail($id)
    {
        $materi = Materi::where('id', $id)->first();
        $mapel = MataPelajaran::where('id', $materi->pelajaran_id)->first();

        return Inertia::render('Guru/GuruMateriDetail', [
            'materi' => $materi, 'mapel' => $mapel
        ]);
    }

    public function edit($id)
    {   
        $materi = Materi::where('id', $id)->first();
        $mapel = MataPelajaran::where('id', $materi->pelajaran_id)->first();

        return Inertia::render('Guru/GuruMateriEdit', [
            'materi' => $materi, 'mapel' => $mapel
        ]);
    }

    public function update(Request $request, $id)
    {
        $materi = Materi::find($id);

        Validator::make($request->all(), [
            'nama' => 'nullable',
            'deskripsi_materi' => 'nullable',
            'pelajaran_id' => 'nullable',
            'file_materi' => 'nullable|file|mimes:pdf,doc,docx,csv,ppt,pptx,txt',
            'video' => 'nullable|string',
        ])->validate();

        if ($request->hasFile('file_materi')) {
            // Hapus file lama jika ada
            if ($materi->file_materi) {
                // Ganti path sesuai dengan path yang sesuai dengan penyimpanan Anda
                Storage::delete('public/uploads/' . $materi->file_materi);
            }

            // Handle unggah file
            $fileMateri = $request->file('file_materi');
            $fileName = time() . '_' . $fileMateri->getClientOriginalName();

            // Simpan file ke direktori public/uploads (Anda bisa menyesuaikan ini)
            $fileMateri->storeAs('public/uploads', $fileName);

            $materi->file_materi = $fileName; 
        }

        // Update data materi
        if ($request->filled('nama') && $request->nama !== $materi->nama) {
            $materi->nama = $request->input('nama');
        }

        if ($request->filled('deskripsi_materi') && $request->deskripsi_materi !== $materi->deskripsi_materi) {
            $materi->deskripsi_materi = $request->input('deskripsi_materi');
        }

        if ($request->filled('file_materi') && $request->file_materi !== $materi->file_materi) {
            $materi->file_materi = $request->input('file_materi');
        }
        if ($request->filled('pelajaran_id') && $request->pelajaran_id !== $materi->pelajaran_id) {
            $materi->pelajaran_id = $request->input('pelajaran_id');
        }
        if ($request->filled('video') && $request->video !== $materi->video) {
            $materi->video = $request->input('video');
        }

        $materi->save();

        return Redirect::route('guru.materi.detail', $materi->pelajaran_id)->with('message', 'Materi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $materi = Materi::findOrFail($id);

        // Hapus file terkait jika ada
        if ($materi->file_materi) {
            // Ganti path sesuai dengan path yang sesuai dengan penyimpanan Anda
            Storage::delete('public/uploads/' . $materi->file_materi);
        }

        // Hapus data materi dari database
        $materi->delete();

        return Redirect::back()->with('message', 'Materi berhasil dihapus');
    }
}
