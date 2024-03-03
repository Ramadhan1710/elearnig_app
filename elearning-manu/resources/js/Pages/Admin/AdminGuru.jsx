import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import GuruDataTable from "@/Pages/Admin/Partials/GuruDataTabel";
import { Head } from "@inertiajs/react";

const AdminGuru = ({ guru, auth }) => {
    const datas = guru.map((gurus, index) => ({
        index: index + 1,
        id: gurus.id,
        name: gurus.user.name,
        email: gurus.user.email,
        nip_guru: gurus.nip_guru,
        jns_kelamin_guru: gurus.jns_kelamin_guru,
        ProfilePicture: gurus.user.ProfilePicture,
    }));

    const jumlahLakiLaki = guru.filter(
        (guru) => guru.jns_kelamin_guru === "Laki-Laki"
    ).length;
    const jumlahPerempuan = guru.filter(
        (guru) => guru.jns_kelamin_guru === "Perempuan"
    ).length;

    const totalguru = guru.length;

    return (
        <AuthenticatedLayoutNew user={auth.user} header={"Data Guru"}>
            <Head title="Data Guru" />
            <div className="px-3">
                <GuruDataTable
                    data={datas}
                    jumlahLakiLaki={jumlahLakiLaki}
                    jumlahPerempuan={jumlahPerempuan}
                    totalguru={totalguru}
                />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminGuru;
