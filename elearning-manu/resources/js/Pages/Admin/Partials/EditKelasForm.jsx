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

const EditKelasForm = ({ className = "", kelas }) => {
    const { errors } = usePage().props;

    const RangeOptions = [
        { value: "X", label: "X" },
        { value: "XI", label: "XI" },
        { value: "XII", label: "XII" },
    ];

    const handleRangeChange = (selectedOption) => {
        setData("range_kelas", selectedOption.value);
    };

    const { data, setData, reset, processing, recentlySuccessful } = useForm({
        range_kelas: null,
        program_studi: null,
        wali_kelas: null,
        tahun_ajaran: null,
    });

    const submit = (e) => {
        e.preventDefault();
        router.visit(`/admin/kelas/${kelas.id}`, {
            method: "patch",
            data: {
                range_kelas: data.range_kelas,
                program_studi: data.program_studi,
                wali_kelas: data.wali_kelas,
                tahun_ajaran: data.tahun_ajaran
            },
            onSuccess: () => {
                reset("range_kelas");
                reset("program_studi");
                reset("wali_kelas");
                reset("tahun_ajaran");
                Swal.fire({
                    title: "Good job!",
                    text: "Berhasil mengubah data.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.get(`/admin/kelas`);
                });
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Masukkan Data Baru Kelas Untuk Mengedit
                </h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="range_kelas"
                        value="Kelas"
                    />
                    <Select
                        id="range_kelas"
                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        classNamePrefix="select"
                        isSearchable={true}
                        isClearable={true}
                        options={RangeOptions}
                        onChange={handleRangeChange}
                    />
                    <InputError className="mt-2" message={errors.range_kelas} />
                </div>
                <div>
                    <InputLabel htmlFor="program_studi" value="Program Studi" />
                    <TextInput
                        id="program_studi"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("program_studi", e.target.value)
                        }
                        autoComplete="program_studi"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.program_studi}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="wali_kelas" value="Wali Kelas" />
                    <TextInput
                        id="wali_kelas"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("wali_kelas", e.target.value)}
                        autoComplete="wali_kelas"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="tahun_ajaran" value="Tahun Ajaran" />
                    <TextInput
                        id="tahun_ajaran"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("tahun_ajaran", e.target.value)
                        }
                        autoComplete="tahun_ajaran"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.tahun_ajaran}
                    />
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

export default EditKelasForm;
