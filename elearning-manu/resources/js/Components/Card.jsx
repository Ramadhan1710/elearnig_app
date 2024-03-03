import React from "react";
import { AiOutlineBook } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";

const Card = ({ title, total, detail }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="grid grid-cols-3">
                <div className="col-span-2 font-semibold text-gray-900 dark:text-white">
                    {title}
                </div>
                <div className="col-span-1 flex justify-end">
                    <div
                        className={`${
                            title === "User"
                                ? "bg-blue-600"
                                : title === "Materi"
                                ? "bg-red-600"
                                : title === "Mata Pelajaran"
                                ? "bg-amber-600"
                                : title === "Kelas"
                                ? "bg-green-600"
                                : ""
                        }  p-3 rounded-full `}
                    >
                        {title === "User" ? (
                            <FaRegUser className="text-xl text-white " />
                        ) : title === "Kelas" ? (
                            <SiGoogleclassroom className="text-xl text-white" />
                        ) : title === "Materi" ? (
                            <BsBook className="text-xl text-white" />
                        ) : title === "Mata Pelajaran" ? (
                            <AiOutlineBook className="text-xl text-white" />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                {total}
            </div>
            <div className="text-xs text-gray-600 dark:text-white">
                {detail}
            </div>
        </div>
    );
};

export default Card;
