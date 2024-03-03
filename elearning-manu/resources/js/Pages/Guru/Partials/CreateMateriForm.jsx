import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const CreateMateriForm = ({ className = "" , pelajaran_id}) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        nama : null,
        deskripsi_materi : null,
        pelajaran_id : pelajaran_id,
        file_materi : null,
        video : null
    });

    const submit = (e) => {
        e.preventDefault();
        post("/guru/materi", {
            preserveScroll: true,
            onSuccess: () => {
                reset("nama");
                reset("file_materi");
                reset("deskripsi_materi");
                reset("video");
                Swal.fire({
                    title: "Good job!",
                    text: "Berhasil menambahkan materi.",
                    icon: "success",
                });
            },
        });
    };
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Masukkan Materi Baru
                </h2>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nama" value="Judul" />
                    <TextInput
                        id="nama"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("nama", e.target.value)}
                        autoComplete="nama"
                    />
                    <InputError className="mt-2" message={errors.nama} />
                </div>
                <div>
                    <InputLabel htmlFor="deskripsi_materi" value="Deskripsi" />
                    <TextInput
                        id="deskripsi_materi"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("deskripsi_materi", e.target.value)}
                        autoComplete="deskripsi_materi"
                    />
                    <InputError className="mt-2" message={errors.deskripsi_materi} />
                </div>
                <div>
                    <InputLabel htmlFor="file_materi" value="Upload File" />
                    <TextInput
                        id="file_materi"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("file_materi", e.target.files[0])}
                        autoComplete="file_materi"
                    />
                    <InputError className="mt-2" message={errors.file_materi} />
                </div>
                <div>
                    <InputLabel htmlFor="video" value="Upload Link Video Youtube (Tidak Wajib)" />
                    <TextInput
                        id="video"
                        type="text"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("video", e.target.value)}
                        autoComplete="video"
                    />
                    <InputError className="mt-2" message={errors.video} />
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

export default CreateMateriForm;
