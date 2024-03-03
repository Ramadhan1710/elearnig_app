import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import ListTugasTable from "./Partials/ListTugasTable";
import { Head, Link } from "@inertiajs/react";

const GuruTugas= ({ auth, materi, mapel}) => {
    const datas = materi.map((materi, index) => ({
        index: index + 1,
        id: materi.id,
        pelajaran_id: materi.pelajaran_id,
        nama: materi.nama,
        deskripsi_materi: materi.deskripsi_materi,
        file_materi: materi.file_materi,
    }));
    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={"Daftar Tugas"}
        >
            <Head title="Daftar Tugas"/>

            {/* untuk fitur halaman aktif tempatkan disini */}

            <div className="px-3">
                <ListTugasTable data={datas} mapel={mapel} />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default GuruTugas;
