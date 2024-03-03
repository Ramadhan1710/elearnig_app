import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import ProfileDetailItem from "@/Components/ProfileDetailItem";
import defaultProfile from "./assets/Profile.png";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import { Head, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const AdminGuruShow = ({ auth, guru }) => {
    const ProfilePicture = guru.user.ProfilePicture;
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

    const rowTables = [
        {
            title: "ID",
            content: guru.id,
        },
        {
            title: "Nama",
            content: guru.user.name,
        },
        {
            title: "Email",
            content: guru.user.email,
        },
        {
            title: "NIP",
            content: guru.nip_guru,
        },
        {
            title: "No. Handphone",
            content: guru.no_telp_guru,
        },
        {
            title: "Jenis Kelamin",
            content: guru.jns_kelamin_guru,
        },
    ];

    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={`Detail Guru ${guru.user.name}`}
        >
            <Head title="Detail Guru" />

            <div className="mx-3 mb-3 p-6 bg-white rounded-xl shadow-md">
                <div>
                    <img
                        src={
                            ProfilePicture
                                ? `/profile_picture/${ProfilePicture}`
                                : defaultProfile
                        }
                        alt="profilImg"
                        className="w-32 h-32 object-cover rounded-full shadow-md"
                    />
                </div>
                <div className="py-4">
                    <ProfileDetailItem rows={rowTables} />
                </div>
                <div>
                    <Link href={`/admin/guru/${guru.id}/edit`}>
                        <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                    <DangerButton
                        onClick={() => handleDeleteClick(guru.id)}
                        className="ml-2 mx-2"
                    >
                        Delete
                    </DangerButton>
                    <Link href={`/admin/guru`}>
                        <button className="inline-flex items-center px-4 py-2 bg-green-700 border border-transparent rounded-md shadow-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                            Kembali
                        </button>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminGuruShow;
