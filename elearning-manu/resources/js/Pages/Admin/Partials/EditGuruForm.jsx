import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { router } from "@inertiajs/react";
import Select from 'react-select';
import Swal from "sweetalert2";

const EditGuruForm = ({ className = "", user, guru }) => {
    const { errors } = usePage().props;

    const jns_kelamin_Options = [
        { value: "Laki-Laki", label: "Laki-Laki" },
        { value: "Perempuan", label: "Perempuan" },
    ];

    const handleJnskelaminChange = (selectedOption) => {
        setData("jns_kelamin_guru", selectedOption.value);
    };

    const { data, setData, reset, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        nip_guru: guru.nip_guru,
        jns_kelamin_guru: guru.jns_kelamin_guru,
        no_telp_guru: guru.no_telp_guru,
    });

    const submit = (e) => {
        e.preventDefault();
        router.visit(`/admin/guru/${guru.id}`, {
            method: "patch",
            data: {
                name: data.name,
                email: data.email,
                nip_guru: data.nip_guru,
                jns_kelamin_guru: data.jns_kelamin_guru,
                no_telp_guru: data.no_telp_guru,
            },
            onSuccess: () => {
                reset("name");
                reset("email");
                reset("nip_guru");
                reset("jns_kelamin_guru");
                reset("no_telp_guru");
                Swal.fire({
                    title: "Good job!",
                    text: "Berhasil mengubah data.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.get(`/admin/guru`);
                });
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Masukkan Data Guru Baru Untuk Mengedit
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
                    <InputLabel htmlFor="nip_guru" value="NIP" />
                    <TextInput
                        id="nip_guru"
                        type="number"
                        value={data.nip_guru ? data.nip_guru : ""}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("nip_guru", e.target.value)}
                        autoComplete="nip_guru"
                    />
                    <InputError className="mt-2" message={errors.nip_guru} />
                </div>
                <div>
                    <InputLabel htmlFor="no_telp_guru" value="No. Telepon" />
                    <TextInput
                        id="no_telp_guru"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("no_telp_guru", e.target.value)
                        }
                        autoComplete="no_telp_guru"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.no_telp_guru}
                    />
                </div>
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="jns_kelamin_guru"
                        value="Jenis Kelamin"
                    />
                    <Select
                        id="jns_kelamin_guru"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        classNamePrefix="select"
                        isSearchable={true}
                        isClearable={true}
                        options={jns_kelamin_Options}
                        onChange={handleJnskelaminChange}
                    />
                    <InputError className="mt-2" message={errors.name} />
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
