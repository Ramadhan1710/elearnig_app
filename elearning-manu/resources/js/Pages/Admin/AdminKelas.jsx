import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import KelasDataTable from "@/Pages/Admin/Partials/KelasDataTabel";
import { Head } from "@inertiajs/react";

const AdminKelas = ({ kelas, auth }) => {
    const datas = kelas.map((kelas, index) => ({
        index: index + 1,
        id: kelas.id,
        range_kelas: kelas.range_kelas,
        program_studi: kelas.program_studi,
    }));

    const jumlahkelasX = kelas.filter(
        (kelas) => kelas.range_kelas === "X"
    ).length;

    const jumlahkelasXI = kelas.filter(
        (kelas) => kelas.range_kelas === "XI"
    ).length;

    const jumlahkelasXII = kelas.filter(
        (kelas) => kelas.range_kelas === "XII"
    ).length;

    return (
        <AuthenticatedLayoutNew user={auth.user} header={"Daftar Kelas"}>
            <Head title="Daftar Kelas" />
            <div className="px-3">
                <KelasDataTable
                    data={datas}
                    jumlahkelasX={jumlahkelasX}
                    jumlahkelasXI={jumlahkelasXI}
                    jumlahkelasXII={jumlahkelasXII}
                    totalkelas={kelas.length}
                />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminKelas;
