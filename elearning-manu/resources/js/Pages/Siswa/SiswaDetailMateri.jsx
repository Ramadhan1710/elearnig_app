import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import { Head, Link } from "@inertiajs/react";
import DetailMateri from "./Partials/DetailMateri";

const SiswaDetailMateri = ({ materi, auth, mapel }) => {
    return (
        <AuthenticatedLayoutNew user={auth.user} header={`Detail Materi`}>
            <Head title="Detail Materi Pelajaran" />
            <div className="px-3">
                <DetailMateri data={materi} />
            </div>
            <div className="px-3 pt-4 flex flex-row pb-2 ">
                <Link href={`/siswa/mapel/${mapel.id}/listmateri`}>
                    <div className="shadow-md flex gap-1 bg-blue-600 items-center py-2 px-3 hover:bg-blue-700 transition rounded-md text-white">
                        Kembali
                    </div>
                </Link>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default SiswaDetailMateri;
