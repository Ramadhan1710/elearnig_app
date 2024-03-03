import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import { Head } from "@inertiajs/react";
import ListMapelTable from "./Partials/ListMapelTable";

const GuruDashboard = ({ auth, mapel }) => {
    const datasMapel = mapel.map((mapel, index) => ({
        index: index + 1,
        mapel: mapel.mapel,
        id: mapel.id,
        kelas: `${mapel.kelas.range_kelas} ${mapel.kelas.program_studi}`
    }));

    return (
        <AuthenticatedLayoutNew user={auth.user} header={"Dashboard Guru"}>
            <Head title="Guru Dashboard" />
            <div className="flex flex-col">
                <div className="bg-green-800 text-white p-6 mx-3 rounded-xl shadow-md">
                    <p>
                        Selamat Datang{" "}
                        <span className="font-semibold">{auth.user.name}</span>,
                        Sekarang kamu berada di halaman Guru dashboard
                        MANUeLearn. Tolong gunakan akses yang ada dengan baik.
                        Semoga harimu menyenangkan! Terima Kasih telah Menggunakan Kami.
                    </p>
                </div>
                <span className="p-4 text-xl text-green-800 font-semibold whitespace-nowrap dark:text-white">
                    Daftar Mata Pelajaran
                </span>
                <div className="px-3">
                    <ListMapelTable data={datasMapel}/>
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default GuruDashboard;
