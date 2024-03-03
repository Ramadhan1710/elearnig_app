<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\MataPelajaran;
use App\Models\Materi;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File; 

class AdminController extends Controller
{
  public function index()
  {
    $user = User::all();
    $siswa = User::where('role','siswa')->get();
    $guru = User::where('role','guru')->get();
    $admin = User::where('role','admin')->get();

    $kelas = Kelas::all();
    $mapel = MataPelajaran::all();
    $materi = Materi::all();

    return Inertia::render('Admin/AdminDashboard',[
      'user'=> $user,
      'siswa' => $siswa,
      'guru' => $guru,
      'admin' => $admin,
      'kelas' => $kelas,
      'mapel' => $mapel,
      'materi' => $materi
    ]);
  }
  public function show()
  {
    return Inertia::render('Admin/AdminProfile');
  }
  public function edit()
  {
    return Inertia::render('Admin/AdminProfileEdit');
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
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}