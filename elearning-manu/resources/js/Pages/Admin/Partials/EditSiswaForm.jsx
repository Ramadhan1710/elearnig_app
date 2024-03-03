import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { router } from "@inertiajs/react";
import Select from "react-select";
import Swal from "sweetalert2";

const EditGuruForm = ({ className = "", user, siswa, kelas }) => {
    const { errors } = usePage().props;

    const jns_kelamin_Options = [
        { value: "Laki-Laki", label: "Laki-Laki" },
        { value: "Perempuan", label: "Perempuan" },
    ];

    const handleJnskelaminChange = (selectedOption) => {
        setData("jns_kelamin_siswa", selectedOption.value);
    };

    const KelasOptions = kelas.map((item) => ({
        value: item.id,
        label: `${item.range_kelas} ${item.program_studi}`,
    }));

    const handleKelasChange = (selectedOption) => {
        setData("kelas_id", selectedOption.value);
    };

    const { data, setData, reset, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        nis_siswa: siswa.nis_siswa,
        nisn_siswa: siswa.nisn_siswa,
        jns_kelamin_siswa: siswa.jns_kelamin_siswa,
        tahun_ajaran_masuk: siswa.tahun_ajaran_masuk,
        kelas_id: siswa.kelas_id,
    });
    console.log(data);
    const submit = (e) => {
        e.preventDefault();
        router.visit(`/admin/siswa/${siswa.id}`, {
            method: "patch",
            data: {
                name: data.name,
                email: data.email,
                nis_siswa: data.nis_siswa,
                nisn_siswa: data.nisn_siswa,
                jns_kelamin_siswa: data.jns_kelamin_siswa,
                tahun_ajaran_masuk: data.tahun_ajaran_masuk,
                kelas_id: data.kelas_id,
            },
            onSuccess: () => {
                reset("name");
                reset("email");
                reset("nsi_siswa");
                reset("nisn_siswa");
                reset("jns_kelamin_siswa");
                reset("tahun_ajaran_masuk");
                reset("kelas_id");
                Swal.fire({
                    title: "Good job!",
                    text: "Berhasil mengubah data.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.get(`/admin/siswa`);
                });
            },
        });
    };

    console.log(data);
    
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Masukkan Data siswa Baru Untuk Mengedit
                </h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        value={data.name ? data.name : ""}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("name", e.target.value)}
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email ? data.email : ""}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="nis_siswa" value="NIS" />
                    <TextInput
                        id="nis_siswa"
                        type="number"
                        value={data.nis_siswa ? data.nis_siswa : ""}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("nis_siswa", e.target.value)}
                        autoComplete="nis_siswa"
                    />
                    <InputError className="mt-2" message={errors.nis_siswa} />
                </div>
                <div>
                    <InputLabel htmlFor="nisn_siswa" value="NISN" />
                    <TextInput
                        id="nisn_siswa"
                        type="number"
                        value={data.nisn_siswa ? data.nisn_siswa : ""}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("nisn_siswa", e.target.value)}
                        autoComplete="nisn_siswa"
                    />
                    <InputError className="mt-2" message={errors.nisn_siswa} />
                </div>

                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="jns_kelamin_siswa"
                        value="Jenis Kelamin"
                    />
                    <Select
                        id="jns_kelamin_siswa"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        classNamePrefix="select"
                        isSearchable={true}
                        isClearable={true}
                        options={jns_kelamin_Options}
                        onChange={handleJnskelaminChange}
                    />
                    <InputError
                        className="mt-2"
                        message={errors.jns_kelamin_siswa}
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="tahun_ajaran_masuk"
                        value="Tahun Ajaran Masuk"
                    />
                    <TextInput
                        id="tahun_ajaran_masuk"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("tahun_ajaran_masuk", e.target.value)
                        }
                        autoComplete="tahun_ajaran_masuk"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.tahun_ajaran_masuk}
                    />
                </div>
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="kelas_id"
                        value="Kelas"
                    />
                    <Select
                        id="kelas_id"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        classNamePrefix="select"
                        isSearchable={true}
                        isClearable={true}
                        options={KelasOptions}
                        onChange={handleKelasChange}
                    />
                    <InputError className="mt-2" message={errors.kelas_id} />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-500 flex items-center">
                            Berhasil <AiOutlineCheckCircle />
                        </p>
                    </Transition>
                </div>
            </form>
            <div className="grid grid-cols-5">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
};

export default EditGuruForm;
