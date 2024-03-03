<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Materi;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;


class GuruController extends Controller
{
    public function index()
    {

        $guru = Guru::where('user_id', auth()->user()->id)->first();

        $mapel = MataPelajaran::where('guru_id', $guru->id)->with('kelas')->get();

        return Inertia::render('Guru/GuruDashboard', [
            'mapel' => $mapel
        ]);
    }
    public function show()
    {
        return Inertia::render('Guru/GuruProfile');
    }
    public function edit()
    {
        return Inertia::render('Guru/GuruProfileEdit');
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
