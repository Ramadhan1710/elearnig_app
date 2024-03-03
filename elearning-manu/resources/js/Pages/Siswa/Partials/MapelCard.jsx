import React from "react";
import { BsBook } from "react-icons/bs";
import { Link } from "@inertiajs/react";

const MapelCard = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="grid grid-cols-3">
                <div className="col-span-3 font-semibold text-gray-900 dark:text-white flex">
                    <div className={`bg-blue-600 p-4 rounded-full `}>
                        <BsBook className="text-xl text-white" />
                    </div>
                    <div className="flex flex-col px-4">
                        <span className="text-xl">{data.mapel}</span>
                        <span className="text-md">{data.guru}</span>
                    </div>
                </div>
            </div>
            <div className="pt-4 text-gray-600 dark:text-white flex justify-end">
                <Link href={`/siswa/mapel/${data.id}/listmateri`} className="text-md text-blue-600 hover:text-gray-700 focus:text-gray-700 active:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        <span>{"Akses Mata Pelajaran ->"}</span>
                </Link>
            </div>
        </div>
    );
};

export default MapelCard;
