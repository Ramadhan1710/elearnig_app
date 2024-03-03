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
        Schema::create('tugas', function (Blueprint $table) {
            $table->id();
            $table->foreignId("materi_id");
            $table->foreign("materi_id")->references("id")->on("mata_pelajaran")->onDelete("cascade");
            $table->string("judul");
            $table->longText("deskripsi");
            $table->dateTime("tanggal_pengumpulan");
            $table->string("lampiran");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tugas');
    }
};
