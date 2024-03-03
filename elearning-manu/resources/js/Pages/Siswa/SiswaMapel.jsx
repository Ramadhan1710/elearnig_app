import React from "react";
import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import MapelCard from "@/Pages/Siswa/Partials/MapelCard";
import { Head } from "@inertiajs/react";

const SiswaMapel = ({ mapel, auth }) => {
    // Memastikan bahwa prop 'auth' dan 'auth.user' tidak undefined sebelum digunakan
    if (!auth || !auth.user) {
        // Mengembalikan elemen atau pesan yang sesuai jika 'auth' atau 'auth.user' adalah undefined
        return (
            <div>
                Auth information is not available.
                {/* Atau elemen lain sesuai kebutuhan */}
            </div>
        );
    }

    // Memproses data dari prop mapel untuk disesuaikan dengan kebutuhan tampilan
    const datas = mapel.map((mapel) => ({
        id: mapel.id,
        mapel: mapel.mapel,
        guru: mapel.guru.user.name,
    }));
    
    return (
        <AuthenticatedLayoutNew
            user={auth.user}
            header={"Daftar Mata Pelajaran"}
        >
            <Head title="Daftar Mata Pelajaran" />
            <div className="px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {datas.map((data) => (
                <MapelCard key={data.id} data={data} />
            ))}
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default SiswaMapel;
