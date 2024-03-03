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

const CreateMapelForm = ({ className = "", kelas , guru }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        mapel: null,
        kelas_id: null,
        guru_id: null,
    });

    const KelasOptions = kelas.map((kelas) => ({
        value: kelas.id,
        label: `${kelas.range_kelas} ${kelas.program_studi}`,
    }));


    const handleKelasChange = (selectedOption) => {
        setData("kelas_id", selectedOption.value);
    };

    const GuruOptions = guru.map((guru) => ({
        value: guru.id,
        label: `${guru.user.name}`,
    }));

    const handleGuruChange = (selectedOption) => {
        setData("guru_id", selectedOption.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post("/admin/mapel", {
            preserveScroll: true,
            onSuccess: () => {
                reset("mapel");
                reset("guru_id");
                reset("kelas_id");
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                    Masukkan Data Mata Pelajaran Baru
                </h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="mapel" value="Mata Pelajaran" />
                    <TextInput
                        id="mapel"
                        type="text"
                        className="mt-1 block w-full "
                        onChange={(e) => setData("mapel", e.target.value)}
                        autoComplete="mapel"
                    />
                    <InputError className="mt-2" message={errors.mapel} />
                </div>
                <div className={"dark:text-white"}>
                    <InputLabel
                        className="mb-1"
                        htmlFor="kelas_id"
                        value="Kelas"
                    />
                    <Select
                        id="kelas_id"
                        classNamePrefix="select dark:bg-gray-900 selection:bg-red-500 selection:text-white dark:text-white"
                        isSearchable={true}
                        isClearable={true}
                        options={KelasOptions}
                        onChange={handleKelasChange}
                    />
                    <InputError className="mt-2" message={errors.kelas_id} />
                </div>
                <div className={"dark:text-white"}>
                    <InputLabel
                        className="mb-1"
                        htmlFor="guru_id"
                        value="Guru Pengajar"
                    />
                    <Select
                        id="guru_id"
                        classNamePrefix="select dark:bg-gray-900 selection:bg-red-500 selection:text-white dark:text-white"
                        isSearchable={true}
                        isClearable={true}
                        options={GuruOptions}
                        onChange={handleGuruChange}
                    />
                    <InputError className="mt-2" message={errors.guru_id} />
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

export default CreateMapelForm;
