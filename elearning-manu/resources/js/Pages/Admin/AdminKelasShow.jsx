import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import KelasDetailItem from "@/Components/KelasDetailItem";
import SiswaKelasDataTable from "@/Pages/Admin/Partials/SiswaKelasDataTable";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const AdminKelasShow = ({ auth, siswa, kelas }) => {
    const datas = siswa.map((siswa,index) => ({
        index: index + 1,
        id: siswa.id,
        nama: siswa.user.name,
        nis: siswa.nis_siswa,
        jenis_kelamin: siswa.jns_kelamin_siswa,
        tahun_ajaran_masuk: siswa.tahun_ajaran_masuk
    }));

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit(`/admin/guru/${id}`, { method: "delete" });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    const jumlahLakiLaki = siswa.filter(
        (siswa) => siswa.jns_kelamin_siswa === "Laki-Laki"
    ).length;
    const jumlahPerempuan = siswa.filter(
        (siswa) => siswa.jns_kelamin_siswa === "Perempuan"
    ).length;

    const totalSiswa = siswa.length;

    const rowTables = [
        {
            title: "Id",
            content: kelas.id,
        },
        {
            title: "Kelas",
            content: kelas.range_kelas,
        },
        {
            title: "Program Studi",
            content: kelas.program_studi,
        },
        {
            title: "Wali Kelas",
            content: kelas.wali_kelas,
        },
        {
            title: "Tahun Ajaran",
            content: kelas.tahun_ajaran,
        },
        {
            title: "Jumlah Laki-Laki",
            content: jumlahLakiLaki,
        },
        {
            title: "Jumlah Perempuan",
            content: jumlahPerempuan,
        },
        {
            title: "Total Siswa",
            content: totalSiswa,
        },
    ];

    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={`Detail Kelas ${kelas.range_kelas} ${kelas.program_studi}`}
        >
            <Head title="Detail Kelas" />

            <div className="p-3 mx-3 fill-gray-400 bg-white shadow-md rounded-xl dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
                <div className="py-2">
                    <KelasDetailItem rows={rowTables} />
                </div>
                <div className="mb-3">
                    <SiswaKelasDataTable data={datas} />
                </div>
                <div className="px-4">
                    <Link href={`/admin/kelas/${kelas.id}/edit`}>
                        <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                    <DangerButton
                        onClick={() => handleDeleteClick(kelas.id)}
                        className="ml-2 mx-2"
                    >
                        Delete
                    </DangerButton>
                    <Link href={`/admin/kelas`}>
                        <button className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md shadow-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">Kembali</button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminKelasShow;
