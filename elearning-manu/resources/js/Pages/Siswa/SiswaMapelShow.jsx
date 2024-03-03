import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
// import MateriCard from './Partials/MateriCard';
import ListMateriTable from "./Partials/ListMateriTable";
import { Head, Link } from "@inertiajs/react";

const SiswaMapelShow = ({ materi, auth }) => {
    const datas = materi.map((materi, index) => ({
        index: index + 1,
        id: materi.id,
        pelajaran_id: materi.pelajaran_id,
        nama: materi.nama,
        deskripsi_materi: materi.deskripsi_materi,
        file_materi: materi.file_materi,
        video: materi.video
    }));

    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={`Daftar Materi Pelajaran `}
        >
            <Head title="Daftar Materi Pelajaran" />
            <div className="px-3">
                <ListMateriTable data={datas}/>
            </div>
            <div className="px-3 pt-4 flex flex-row pb-2 ">
                <Link href={route("siswa.mapel.index")}>
                    <div className="shadow-md flex gap-1 bg-blue-600 items-center py-2 px-3 hover:bg-blue-700 transition rounded-md text-white">
                        Kembali
                    </div>
                </Link>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default SiswaMapelShow;
