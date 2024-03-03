import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import ListMateriTable from "./Partials/ListMateriTable";
import { Head, Link } from "@inertiajs/react";
import moment from "moment/moment";

const GuruMateriShow = ({ auth, materi, mapel }) => {
    const datas = materi.map((materi, index) => ({
        index: index + 1,
        id: materi.id,
        pelajaran_id: materi.pelajaran_id,
        nama: materi.nama,
        deskripsi_materi: materi.deskripsi_materi,
        file_materi: materi.file_materi,
        video: materi.video,
        created_at: moment(materi.created_at).format("D MMMM YYYY - HH:mm"), // Format tanggal dan waktu
    }));

    console.log(datas);
    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={"Daftar Materi Pelajaran"}
        >
            <Head title="Tambah Materi Baru" />
            <div className="px-3">
                <ListMateriTable data={datas} mapel={mapel} />
            </div>
            <div className="px-3 pt-4 flex flex-row pb-2 ">
                <Link href={route("guru.materi.index")}>
                    <div className="shadow-md flex gap-1 bg-blue-600 items-center py-2 px-3 hover:bg-blue-700 transition rounded-md text-white">
                        Kembali
                    </div>
                </Link>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default GuruMateriShow;
