<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Siswa;
use App\Models\Kelas;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class AdminSiswaController extends Controller
{
    public function index()
    {
        $siswa = Siswa::with('user', 'kelas')->get();

        return Inertia::render('Admin/AdminSiswa', [
            'siswa' => $siswa
        ]);
    }

    public function create()
    {
        $kelas = Kelas::all();
        return Inertia::render('Admin/AdminSiswaCreate', [
            'kelas' => $kelas,
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|regex:/^[A-Za-z .,]+$/|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|string',
            'nis_siswa' => 'required',
            'nisn_siswa' => 'required',
            'jns_kelamin_siswa' => 'required',
            'tahun_ajaran_masuk' => 'required',
            'kelas_id' => 'required',
        ])->validate();

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => 'siswa',
        ]);

        Siswa::create([
            'nis_siswa' => $request->input('nis_siswa'),
            'nisn_siswa' => $request->input('nisn_siswa'),
            'kelas_id' => $request->input('kelas_id'), // Menggunakan kelas_id
            'jns_kelamin_siswa' => $request->input('jns_kelamin_siswa'),
            'tahun_ajaran_masuk' => $request->input('tahun_ajaran_masuk'),
            'user_id' => $user->id,
        ]);

        return Redirect::route('admin.siswa.index')->with('message', 'Siswa berhasil ditambahkan');
    }

    public function show($id)
    {
        // Assuming $id is the ID of the student you want to display details for
        $siswa = Siswa::with('user','kelas')->findOrFail($id);

        return Inertia::render('Admin/AdminSiswaShow', [
            'siswa' => $siswa,
        ]);
    }

    public function edit($id)
    {
        $siswa = Siswa::find($id);

        $user = User::where('id', $siswa->user_id)->first();

        $kelas = Kelas::all();

        return Inertia::render('Admin/AdminSiswaEdit', [
            'user' => $user,
            'siswa' => $siswa,
            'kelas' => $kelas,
        ]);
    }

    public function update(Request $request, $id)
    {

        $siswa = Siswa::find($id);
        $user = User::where('id', $siswa->user_id)->first();

        Validator::make($request->all(), [
            'name' => 'nullable|regex:/^[A-Za-z ,.]+$/|max:255',
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'nis_siswa' => 'nullable',
            'nisn_siswa' => 'nullable',
            'jns_kelamin_siswa' => 'nullable|in:Laki-Laki,Perempuan',
            'tahun_ajaran_masuk' => 'nullable',
            'kelas_id' => 'nullable',
        ])->validate();

        // Memeriksa apakah ada perubahan dalam input
        if ($request->input('name') != '' && $request->input('name') != $user->name) {
            $user->name = $request->input('name');
        }
        if ($request->input('email') != '' && $request->input('email') != $user->email) {
            $user->email = $request->input('email');
        }
        if ($request->input('nis_siswa') != '' && $request->input('nis_siswa') != $siswa->nis_siswa) {
            $siswa->nis_siswa = $request->input('nis_siswa');
        }
        if ($request->input('nisn_siswa') != '' && $request->input('nisn_siswa') != $siswa->nisn_siswa) {
            $siswa->nisn_siswa = $request->input('nisn_siswa');
        }
        if ($request->input('jns_kelamin_siswa')) {
            $siswa->jns_kelamin_siswa = $request->input('jns_kelamin_siswa');
        }
        if ($request->input('tahun_ajaran_masuk') != '' && $request->input('tahun_ajaran_masuk') != $siswa->tahun_ajaran_masuk) {
            $siswa->tahun_ajaran_masuk = $request->input('tahun_ajaran_masuk');
        }
        if ($request->input('kelas_id') != '' && $request->input('kelas_id') != $siswa->kelas_id) {
            $siswa->kelas_id = $request->input('kelas_id');
        }

        // Hanya menyimpan jika ada perubahan
        $user->save();
        $siswa->save();

        return Redirect::route('admin.siswa.index')->with('message', 'Siswa berhasil diupdate');
    }


    public function destroy($id): RedirectResponse
    {
        $user = User::findOrFail($id);

        $siswa = Siswa::where('user_id' , $user->id)->first();

        // Now you can safely delete the user
        $siswa->delete();
        $user->delete();

        return Redirect::to('/admin/siswa');
    }
}
