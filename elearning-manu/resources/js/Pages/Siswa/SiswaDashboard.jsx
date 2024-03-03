import AuthenticatedLayoutNew from "@/Layouts/AuthenticatedLayoutNew";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import MateriTerbaruTable from "@/Pages/Siswa/Partials/MateriTerbaruTable";

const SiswaDashboard = ({ mapel, auth }) => {
    const materiTerbaru = mapel.flatMap((item) => item.materi);

    const datas = materiTerbaru.map((materi, index) => ({
        index: index + 1,
        id: materi.id,
        pelajaran_id: materi.pelajaran_id,
        nama: materi.nama,
        deskripsi_materi: materi.deskripsi_materi,
        file_materi: materi.file_materi,
        video: materi.video,
    }));
    return (
        <AuthenticatedLayoutNew user={auth.user} header={"Dashboard Siswa"}>
            <Head title="SiswaDashboard" />
            <div className="flex flex-col">
                <div className="bg-green-800 text-white p-6 mx-3 rounded-xl shadow-md">
                    <p>
                        Selamat Datang{" "}
                        <span className="font-semibold">{auth.user.name}</span>,
                        Sekarang kamu berada di halaman Siswa dashboard
                        MANUeLearn. Tolong gunakan akses yang ada dengan baik.
                        Semoga harimu menyenangkan! Terima Kasih telah
                        Menggunakan Kami.
                    </p>
                </div>
                <span className="p-4 text-xl text-green-800 font-semibold whitespace-nowrap dark:text-white">
                    Daftar Materi Terbaru
                </span>
                <div className="px-3">
                    <MateriTerbaruTable data={datas} />
                </div>
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default SiswaDashboard;
