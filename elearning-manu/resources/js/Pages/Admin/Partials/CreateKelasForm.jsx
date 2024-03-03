import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import Select from "react-select";

const CreateKelasForm = ({ className = "" }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        range_kelas: null,
        program_studi: null,
        wali_kelas: null,
        tahun_ajaran: null
    });

    const RangeOptions = [
        { value: "X", label: "X" },
        { value: "XI", label: "XI" },
        { value: "XII", label: "XII" },
    ];

    const handleRangeChange = (selectedOption) => {
        setData("range_kelas", selectedOption.value);
    };

    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        post("/admin/kelas", {
            preserveScroll: true,
            onSuccess: () => {
                reset("range_kelas");
                reset("program_studi");
                reset("wali_kelas");
                reset("tahun_ajaran");
                Swal.fire({
                    title: "Good job!",
                    text: "Berhasil membuat kelas.",
                    icon: "success",
                });
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                    Masukkan Data Kelas Baru
                </h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className={'dark:text-white'}>
                    <InputLabel
                        className="mb-1"
                        htmlFor="range_kelas"
                        value="Kelas"
                    />
                    <Select
                        id="range_kelas"
                        classNamePrefix="select dark:bg-gray-900 selection:bg-red-500 selection:text-white dark:text-white"
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
                        onChange={(e) => setData("program_studi", e.target.value)}
                        autoComplete="program_studi"
                    />
                    <InputError className="mt-2" message={errors.program_studi} />
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
                        onChange={(e) => setData("tahun_ajaran", e.target.value)}
                        autoComplete="tahun_ajaran"
                    />
                    <InputError className="mt-2" message={errors.tahun_ajaran} />
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

export default CreateKelasForm;
