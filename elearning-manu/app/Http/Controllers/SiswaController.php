<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Siswa;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;


class SiswaController extends Controller
{
    public function index()
    {
        $siswa = Siswa::where('user_id', auth()->user()->id)->first();

        // Ambil kelas siswa
        $kelas = Kelas::where('id', $siswa->kelas_id)->first();

        // Ambil semua mata pelajaran yang terkait dengan kelas siswa dan sertakan materi
        $mapel = MataPelajaran::where('kelas_id', $kelas->id)
            ->with(['materi' => function ($query) {
                $query->where('created_at', '>', Carbon::now()->subDay())
                    ->orderBy('created_at', 'desc')
                    ->take(5); // Ambil lima materi terbaru
            }])
            ->get();

        // Kirim data mapel beserta materi ke halaman dashboard siswa
        return Inertia::render('Siswa/SiswaDashboard', [
            'mapel' => $mapel,
        ]);
    }

    public function show()
    {
        return Inertia::render('Siswa/SiswaProfile');
    }
    public function edit()
    {
        return Inertia::render('Siswa/SiswaProfileEdit');
    }

    public function update(Request $request)
    {
        $user = $request->user();

        Validator::make($request->all(), [
            'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'ProfilePicture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ])->validate();

        if ($request->file("ProfilePicture")) {
            $path = "profile_picture/";
            $oldProfilePicture = $user->ProfilePicture;
            if ($oldProfilePicture) {
                File::delete(public_path($path . $oldProfilePicture));
            }
            $imageName = time() . '.' . $request->file('ProfilePicture')->getClientOriginalExtension();
            $request->file('ProfilePicture')->move(public_path($path), $imageName);
            $user->profilePicture = $imageName;
        }
        if ($request->input('name') != '' && $request->input('name') != $user->name) {
            $user->name = $request->input('name');
        }
        if ($request->input('email') != '' && $request->input('email') != $user->email) {
            $user->email = $request->input('email');
        }
        $user->save();

        return redirect()->back()->with('message', 'Profil berhasil diupdate');
    }
}
