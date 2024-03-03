<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Siswa\SiswaMateriController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\AdminGuruController;
use App\Http\Controllers\AdminKelasController;
use App\Http\Controllers\AdminSiswaController;
use App\Http\Controllers\AdminMapelController;
use App\Http\Controllers\Guru\GuruMataPelajaran;
use App\Http\Controllers\Guru\GuruMateriController;
use App\Http\Controllers\SiswaMapelController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// File: routes/web.php

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/profile', [AdminController::class, 'show'])->name('adminProfile.show');
    Route::get('/admin/profile/edit', [AdminController::class, 'edit'])->name('adminProfile.edit');
    Route::patch('/admin/profile', [AdminController::class, 'update'])->name('adminProfile.update');

    Route::get('/admin/guru', [AdminGuruController::class, 'index'])->name('admin.guru.index');
    Route::get('/admin/guru/create', [AdminGuruController::class, 'create'])->name('admin.guru.create');
    Route::post('/admin/guru', [AdminGuruController::class, 'store'])->name('admin.guru.store');
    Route::get('/admin/guru/{id}', [AdminGuruController::class, 'show'])->name('admin.guru.show');
    Route::get('/admin/guru/{id}/edit', [AdminGuruController::class, 'edit'])->name('admin.guru.edit');
    Route::patch('/admin/guru/{id}', [AdminGuruController::class, 'update'])->name('admin.guru.update');
    Route::delete('/admin/guru/{id}', [AdminGuruController::class, 'destroy'])->name('admin.guru.destroy');

    Route::get('/admin/kelas', [AdminKelasController::class, 'index'])->name('admin.kelas.index');
    Route::get('/admin/kelas/create', [AdminKelasController::class, 'create'])->name('admin.kelas.create');
    Route::post('/admin/kelas', [AdminKelasController::class, 'store'])->name('admin.kelas.store');
    Route::get('/admin/kelas/{id}', [AdminKelasController::class, 'show'])->name('admin.kelas.show');
    Route::get('/admin/kelas/{id}/edit', [AdminKelasController::class, 'edit'])->name('admin.kelas.edit');
    Route::patch('/admin/kelas/{id}', [AdminKelasController::class, 'update'])->name('admin.kelas.update');
    Route::delete('/admin/kelas/{id}', [AdminKelasController::class, 'destroy'])->name('admin.kelas.destroy');

    Route::get('/admin/siswa', [AdminSiswaController::class, 'index'])->name('admin.siswa.index');
    Route::get('/admin/siswa/create', [AdminSiswaController::class, 'create'])->name('admin.siswa.create');
    Route::post('/admin/siswa', [AdminSiswaController::class, 'store'])->name('admin.siswa.store');
    Route::get('/admin/siswa/{id}', [AdminSiswaController::class, 'show'])->name('admin.siswa.show');
    Route::get('/admin/siswa/{id}/edit', [AdminSiswaController::class, 'edit'])->name('admin.siswa.edit');
    Route::patch('/admin/siswa/{id}', [AdminSiswaController::class, 'update'])->name('admin.siswa.update');
    Route::delete('/admin/siswa/{id}', [AdminSiswaController::class, 'destroy'])->name('admin.siswa.destroy');

    Route::get('/admin/mapel/create', [AdminMapelController::class, 'create'])->name('admin.mapel.create');
    Route::get('/admin/mapel', [AdminMapelController::class, 'index'])->name('admin.mapel.index');
    Route::post('/admin/mapel', [AdminMapelController::class, 'store'])->name('admin.mapel.store');
    Route::get('/admin/mapel/{id}', [AdminMapelController::class, 'show'])->name('admin.mapel.show');
    Route::get('/admin/mapel/{id}/edit', [AdminMapelController::class, 'edit'])->name('admin.mapel.edit');
    Route::patch('/admin/mapel/{id}', [AdminMapelController::class, 'update'])->name('admin.mapel.update');
    Route::delete('/admin/mapel/{id}', [AdminMapelController::class, 'destroy'])->name('admin.mapel.destroy');
});

Route::middleware(['auth', 'role:guru'])->group(function () {
    Route::get('/guru/dashboard', [GuruController::class, 'index'])->name('guru.dashboard');

    Route::get('/guru/profile', [GuruController::class, 'show'])->name('guruProfile.show');
    Route::get('/guru/profile/edit', [GuruController::class, 'edit'])->name('guruProfile.edit');
    Route::patch('/guru/profile', [GuruController::class, 'update'])->name('guruProfile.update');

    //Mapel
    Route::get('/guru/mapel', [GuruMataPelajaran::class, 'index'])->name('guru.mapel.index');
    Route::get('/guru/mapel/{mataPelajaran}', [GuruMataPelajaran::class, 'show'])->name('guru.mapel.show');

    //Materi
    Route::get('/guru/materi/create/{pelajaran_id}', [GuruMateriController::class, 'create'])->name('guru.materi.create');
    Route::post('/guru/materi', [GuruMateriController::class, 'store'])->name('guru.materi.store');
    Route::get('/guru/materi', [GuruMateriController::class, 'index'])->name('guru.materi.index');
    Route::get('/guru/materi/{pelajaran_id}', [GuruMateriController::class, 'show'])->name('guru.materi.show');
    Route::get('/guru/materi/detail/{id}', [GuruMateriController::class, 'detail'])->name('guru.materi.detail');
    Route::get('/guru/materi/{id}/edit', [GuruMateriController::class, 'edit'])->name('guru.materi.edit');
    Route::patch('/guru/materi/{id}', [GuruMateriController::class, 'update'])->name('guru.materi.update');
    Route::delete('/guru/materi/{id}', [GuruMateriController::class, 'destroy'])->name('guru.materi.destroy');
});

Route::middleware(['auth', 'role:siswa'])->group(function () {
    Route::get('/siswa/dashboard', [SiswaController::class, 'index'])->name('siswa.dashboard');
    Route::get('/siswa/profile', [SiswaController::class, 'show'])->name('siswaProfile.show');
    Route::get('/siswa/profile/edit', [SiswaController::class, 'edit'])->name('siswaProfile.edit');
    Route::patch('/siswa/profile', [SiswaController::class, 'update'])->name('siswaProfile.update');
    // Mapel
    Route::get('/siswa/mapel', [SiswaMapelController::class, 'index'])->name('siswa.mapel.index');
    Route::get('/siswa/mapel/{mataPelajaranId}/listmateri', [SiswaMapelController::class, 'show'])->name('siswa.mapel.show');

    // Materi
    Route::get('/siswa/materi/{pelajaran_id}', [SiswaMateriController::class, 'show'])->name('siswa.materi.show');
});
