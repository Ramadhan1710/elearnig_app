import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";

const AdminDashboard = ({
    auth,
    user,
    siswa,
    guru,
    admin,
    kelas,
    mapel,
}) => {
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
        <AuthenticatedLayoutNew user={auth.user} header={"Dashboard Admin"}>
            <Head title="AdminDashboard" />
            <div className="flex flex-col">
                <div className="bg-green-800 text-white p-6 mx-3 rounded-xl shadow-md">
                    <p>
                        Selamat Datang{" "}
                        <span className="font-semibold">{auth.user.name}</span>,
                        Sekarang kamu berada di halaman Admin dashboard
                        MANUeLearn. Tolong gunakan akses yang ada dengan baik.
                        Semoga harimu menyenangkan!
                    </p>
                </div>

                <span className="p-4 text-xl text-green-800 font-semibold whitespace-nowrap dark:text-white">
                    Statistika
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
                    <Card
                        title={"User"}
                        total={user.length}
                        detail={`Siswa ${siswa.length}, Guru ${guru.length}, Admin ${admin.length} `}
                    />
                    <Card
                        title={"Kelas"}
                        total={kelas.length}
                        detail={`${jumlahkelasX} Kelas X , ${jumlahkelasXI} Kelas XI , ${jumlahkelasXII} Kelas XII`}
                    />
                    <Card title={"Mata Pelajaran"} total={mapel.length} />
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminDashboard;
