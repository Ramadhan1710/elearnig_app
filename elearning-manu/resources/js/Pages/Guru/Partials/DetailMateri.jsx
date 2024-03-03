import { BsBook, BsTrash3 } from "react-icons/bs";
import {
    FaFilePdf,
    FaFileWord,
    FaFilePowerpoint,
    FaFile,
    FaDownload,
} from "react-icons/fa";
import { Link } from "@inertiajs/react";
import { FaVideo } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import moment from "moment/moment";
import { AiOutlineYoutube } from "react-icons/ai";


const DetailMateri = ({ data }) => {
    const [showPdf, setShowPdf] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const fileExtension = data.file_materi.split(".").pop().toLowerCase();

    const togglePdfDisplay = () => {
        setShowPdf(!showPdf);
    };

    const toggleVideoDisplay = () => {
        setShowVideo(!showVideo);
    };

    const created_at = moment(data.created_at).format("D MMMM YYYY - HH:mm");

    // const isVideo = data.video && data.video.toLowerCase().includes("youtube");

    const getFileIcon = (fileName) => {
        if (!fileName) return null;

        const extension = fileName.split(".").pop().toLowerCase();

        switch (extension) {
            case "pdf":
                return <FaFilePdf className="text-red-500" />;
            case "doc":
            case "docx":
                return <FaFileWord className="text-blue-500" />;
            case "ppt":
            case "pptx":
                return <FaFilePowerpoint className="text-orange-500" />;
            default:
                return <FaFile className="text-gray-500" />;
        }
    };

    const getVideoEmbed = (videoLink) => {
        // Regex untuk mengekstrak ID video YouTube dari link
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        // Ekstrak ID video menggunakan regex
        const match = videoLink.match(regex);

        // Jika ID ditemukan, kembalikan link embed
        if (match && match[1]) {
            const videoId = match[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Jika tidak ditemukan, kembalikan null
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="">
                <div className="col-span-6 text-gray-900 dark:text-white flex">
                    <span className="pt-2 text-xl">{data.nama}</span>
                </div>
            </div>
            <div className="mt-6 col-span-2 flex flex-col ">
                <span className="text-md">Deskripsi:</span>
                <span className="text-md">{data.deskripsi_materi}</span>
            </div>
            <div className="mt-6 col-span-2 flex flex-col ">
                <span className="text-md">Diupload pada {created_at}</span>
            </div>

            <span>Document:</span>
            <div
                href="#"
                className="mt-2 flex font-bold border border-1 border-gray-300 p-2 rounded-md text-gray-900 mb-2 dark:text-white"
            >
                <div className="flex flex-row ">
                    <span className="text-3xl">
                        {getFileIcon(data.file_materi)}
                    </span>
                </div>

                <button
                    onClick={togglePdfDisplay}
                    className="flex flex-row w-full justify-end"
                >
                    {fileExtension === "pdf" &&
                        (showPdf ? (
                            <div className="text-dark p-2">
                                <FaEyeSlash />
                            </div>
                        ) : (
                            <div className="text-dark p-2">
                                <IoEyeSharp />
                            </div>
                        ))}
                </button>

                <a
                    href={`/storage/uploads/${data.file_materi}`}
                    className="text-dark p-2"
                >
                    <FaDownload />
                </a>
            </div>
            {showPdf && (
                <div className="mt-4">
                    <object
                        data={`/storage/uploads/${data.file_materi}`}
                        type="application/pdf"
                        width="800"
                        height="600"
                        className="w-full"
                    >
                        <p className="text-gray-700 text-sm">
                            It appears you don't have a PDF viewer for this
                            browser. No biggie... you can{" "}
                            <a
                                href={`/storage/uploads/${data.file_materi}`}
                                className="text-blue-600"
                            >
                                click here to download the PDF file.
                            </a>
                        </p>
                    </object>
                </div>
            )}
            <span>Video:</span>
            {data.video && (
                <div className="mt-2 flex font-bold border border-1 border-gray-300 p-2 rounded-md text-gray-900 mb-2 dark:text-white w-auto">
                    <div className="text-red-500 text-3xl">
                        <AiOutlineYoutube />
                    </div>
                    <button
                        onClick={toggleVideoDisplay}
                        className="flex flex-row w-full justify-end"
                    >
                        {showVideo ? (
                            <div className="text-dark p-2">
                                <FaEyeSlash />
                            </div>
                        ) : (
                            <div className="text-dark p-2">
                                <IoEyeSharp />
                            </div>
                        )}
                    </button>
                </div>
            )}
            {showVideo ? (
                <div className="mt-2">
                    <iframe
                        width="800"
                        height="600"
                        src={getVideoEmbed(data.video)}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                        className="w-full"
                    ></iframe>
                </div>
            ) : (
                !data.video && (
                    <div className="mt-2 text-gray-500 dark:text-gray-400">
                        Tidak ada video.
                    </div>
                )
            )}
            <div className="text-xs pt-4 text-gray-600 dark:text-white flex justify-end">
                <a href={`/guru/materi/${data.id}/edit`}>
                    <button className="bg-blue-600 p-2 px-4 mx-2 text-sm rounded text-white font-semibold tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Edit
                    </button>
                </a>
            </div>
        </div>
    );
};

export default DetailMateri;
