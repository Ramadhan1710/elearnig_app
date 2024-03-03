import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import SiswaDataTable from "@/Pages/Admin/Partials/SiswaDataTable";
import { Head } from "@inertiajs/react";

const AdminSiswa = ({ siswa, auth }) => {
    const combinedData = siswa.map((siswaItem, index) => {
        return {
            index: index + 1,
            id: siswaItem.id,
            name: siswaItem.user.name,
            email: siswaItem.user.email,
            nis_siswa: siswaItem.nis_siswa,
            nisn_siswa: siswaItem.nisn_siswa,
            jns_kelamin_siswa: siswaItem.jns_kelamin_siswa,
            tahun_ajaran_masuk: siswaItem.tahun_ajaran_masuk,
            ProfilePicture: siswaItem.user.ProfilePicture,
            kelas: `${siswaItem.kelas.range_kelas} ${siswaItem.kelas.program_studi}`,
        };
    });

    const jumlahLakiLaki = siswa.filter(
        (siswa) => siswa.jns_kelamin_siswa === "Laki-Laki"
    ).length;
    const jumlahPerempuan = siswa.filter(
        (siswa) => siswa.jns_kelamin_siswa === "Perempuan"
    ).length;

    const totalSiswa = siswa.length;

    return (
        <AuthenticatedLayoutNew user={auth.user} header={"Data Siswa"}>
            <Head title="Data Siswa" />
            <div className="px-3">
                <SiswaDataTable
                    data={combinedData}
                    jumlahLakiLaki={jumlahLakiLaki}
                    jumlahPerempuan={jumlahPerempuan}
                    totalSiswa={totalSiswa}
                />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminSiswa;
