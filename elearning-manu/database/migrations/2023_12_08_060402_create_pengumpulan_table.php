<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengumpulan_tugas', function (Blueprint $table) {
            $table->id();
            $table->foreignId("tugas_id");
            $table->foreign("tugas_id")->references("id")->on("tugas")->onDelete("cascade");
            $table->foreignId("siswa_id")->nullable();
            $table->foreign("siswa_id")->references("id")->on("siswa")->onDelete("cascade");
            $table->string("teks")->nullable();
            $table->foreignId("guru_id")->nullable();
            $table->foreign("guru_id")->references("id")->on("guru")->onDelete("cascade");
            $table->string("lampiran")->nullable();
            $table->string("status")->nullable();
            $table->integer("nilai")->nullable();
            $table->dateTime("tanggal_penilaian")->nullable();
            $table->dateTime("tanggal_pengumpulan")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengumpulan');
    }
};
