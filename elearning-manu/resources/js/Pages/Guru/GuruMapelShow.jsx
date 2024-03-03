import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import DataSiswaTable from "@/Pages/Guru/Partials/DataSiswaTable";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Head, Link } from "@inertiajs/react";

const GuruMapelShow = ({ mapeldata, auth }) => {
    console.log(mapeldata);
    const datas = mapeldata.kelas.siswa.map((item, index) => ({
        id: item.id,
        index: index + 1,
        name: item.user.name,
        nis_siswa: item.nis_siswa,
    }));

    return (
        <AuthenticatedLayoutNew user={auth.user} header={`Daftar Siswa Kelas ${mapeldata.kelas.range_kelas} ${mapeldata.kelas.program_studi}`}>
            <Head title="Detail Mata Pelajaran" />
            <div className="px-3">
                <div className="flex justify-start mb-2">
                    <div className="">
                        <a
                            href={`/guru/materi/create/${mapeldata.id}`}
                            className="flex gap-2 bg-blue-600 items-center justify-end py-2 px-3 hover:bg-blue-700 transition rounded-md text-white"
                        >
                            <AiOutlinePlusCircle /> <span>Tambah</span>
                            <span>Materi</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-3">
                <DataSiswaTable data={datas} />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default GuruMapelShow;
