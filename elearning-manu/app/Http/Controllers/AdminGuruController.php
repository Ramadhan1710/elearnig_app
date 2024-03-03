<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Materi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class AdminGuruController extends Controller
{
    /**
     * Menampilkan daftar guru.
     */
    public function index()
    {
        $guru = Guru::with('user')->get();
        return Inertia::render('Admin/AdminGuru', ['guru' => $guru]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminGuruCreate');
    }

    public function show($id)
    {
        // Assuming $id is the ID of the student you want to display details for
        $guru = Guru::with('user')->find($id);

        return Inertia::render('Admin/AdminGuruShow', [
            'guru' => $guru,
        ]);
    }

    /**
     * Menyimpan guru baru.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|regex:/^[A-Za-z .,]+$/|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|string'
        ])->validate();
        // Simpan data pengguna
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => 'guru'
        ]);
        // Dapatkan ID pengguna yang baru saja dibuat
        $userId = $user->id;
        // Simpan data ke dalam tabel teachers
        Guru::create([
            'nip_guru' => $request->input('nip'),
            'jns_kelamin_guru' => $request->input('jns_kelamin_guru'),
            'no_telp_guru' => $request->input('no_telp_guru'),
            'user_id' => $userId,
        ]);

        return Redirect::route('admin.guru.index')->with('message', 'Guru berhasil ditambahkan');
    }

    /**
     * Menampilkan halaman edit guru.
     */
    public function edit($id)
    {
        $guru = Guru::find($id);
        $user = User::where('id', $guru->user_id)->first();

        return Inertia::render('Admin/AdminGuruEdit', [
            'user' => $user,
            'guru' => $guru
        ]);
    }

    /**
     * Mengupdate guru.
     */
    public function update(Request $request, $id)
    {
        $guru = Guru::find($id);
        $user = User::where('id',$guru->user_id)->first();

        Validator::make($request->all(), [
            'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($user->id), // Pastikan email adalah unik, mengabaikan saat memeriksa data saat ini
            ],
            'nip_guru' => [
                'nullable',
                'regex:/^\d{18}$/',
                Rule::unique('guru', 'nip_guru')->ignore($guru->id),

            ],
            'jns_kelamin_guru' => 'nullable|in:Laki-Laki,Perempuan', // Add this line
            'no_telp_guru' => 'nullable|string',
        ])->validate();
        // Memeriksa apakah ada perubahan dalam input
        if ($request->input('name') != '' && $request->input('name') != $user->name) {
            $user->name = $request->input('name');
        }
        if ($request->input('email') != '' && $request->input('email') != $user->email) {
            $user->email = $request->input('email');
        }
        if ($request->input('nip_guru') != '' && $request->input('nip_guru') != $guru->nip) {
            $guru->nip_guru = $request->input('nip_guru');
        }
        if ($request->input('jns_kelamin_guru')) {
            $guru->jns_kelamin_guru = $request->input('jns_kelamin_guru');
        }
        if ($request->input('no_telp_guru') != '' && $request->input('no_telp_guru') != $guru->no_telp_guru) {
            $guru->no_telp_guru = $request->input('no_telp_guru');
        }
        
        // Hanya menyimpan jika ada perubahan
        $user->save();
        $guru->save();

        return Redirect::route('admin.guru.index')->with('message', 'Guru berhasil diupdate');
    }

    /**
     * Menghapus guru.
     */
    public function destroy($id) 

    {
        $guru = Guru::findOrFail($id);

        $user = User::where('id' , $guru -> user_id)->first();

        // Now you can safely delete the user
        $user->delete();
        $guru->delete();

        return Redirect::route('admin.guru.index')->with('message', 'Guru berhasil dihapus');
    }
}
