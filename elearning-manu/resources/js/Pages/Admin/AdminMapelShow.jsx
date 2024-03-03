import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import MapelDetailItem from "./Partials/MapelDetailItem";

const AdminMapelShow = ({ auth, mapel, siswa }) => {
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
                router.visit(`/admin/mapel/${id}`, { method: "delete" });
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
            content: mapel.id,
        },
        {
            title: "Mata Pelajaran",
            content: mapel.mapel,
        },
        {
            title: "Kelas",
            content: `${mapel.kelas.range_kelas} ${mapel.kelas.program_studi}`,
        },
        {
            title: "Guru",
            content: mapel.guru.user.name,
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
            header={`Detail Mata Pelajaran ${mapel.mapel} ${mapel.kelas.range_kelas} ${mapel.kelas.program_studi}`}
        >
            <Head title="Detail Mata Pelajaran" />

            <div className="mx-3 mb-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="py-2">
                    <MapelDetailItem rows={rowTables} />
                </div>
                <div>
                    <Link href={`/admin/mapel/${mapel.id}/edit`}>
                        <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                    <DangerButton
                        onClick={() => handleDeleteClick(mapel.id)}
                        className="ml-2 mx-2"
                    >
                        Delete
                    </DangerButton>
                    <Link href={`/admin/mapel`}>
                        <button className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md shadow-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">Kembali</button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminMapelShow;
