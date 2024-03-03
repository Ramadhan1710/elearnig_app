import React from "react";
import { BsBook } from "react-icons/bs";
import { Link } from "@inertiajs/react";

const MapelCard = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="grid grid-cols-3">
                <div className="col-span-4 font-semibold text-gray-900 dark:text-white flex">
                    <div className={`bg-blue-600 p-4 rounded-full `}>
                        <BsBook className="text-xl text-white" />
                    </div>
                    <div className="flex flex-col px-4">
                        <span className="px-2 text-md">{data.mapel}</span>
                        <span className="px-2 text-md">{data.kelas}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex justify-end"></div>
            <div className="text-3xl font-bold text-gray-900 mb-2 dark:text-white"></div>
            <div className="text-xs pt-4 text-gray-600 dark:text-white flex justify-end">
                <a href={`/guru/materi/${data.id}`}>
                    <button className="bg-blue-600 p-2 text-sm rounded text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Lihat List Materi
                    </button>
                </a>
            </div>
        </div>
    );
};

export default MapelCard;
