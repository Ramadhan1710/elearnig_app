import React from "react";
import SidebarLink from "./SidebarLink";
import { Link } from "@inertiajs/react";
import {
    FaHome,
    FaBook,
    FaUsers,
    FaChalkboardTeacher,
    FaClipboardList,
    FaGraduationCap,
    FaFileAlt,
    FaChartBar,
    FaSignOutAlt,
} from "react-icons/fa";

const roleLinks = {
    admin: [
        { name: "Beranda", icon: <FaHome />, routeName: "admin.dashboard" },
        { name: "Siswa", icon: <FaUsers />, routeName: "admin.siswa.index" },
        {
            name: "Guru",
            icon: <FaChalkboardTeacher />,
            routeName: "admin.guru.index",
        },
        {
            name: "Kelas",
            icon: <FaClipboardList />,
            routeName: "admin.kelas.index",
        },
        {
            name: "Mata Pelajaran",
            icon: <FaBook />,
            routeName: "admin.mapel.index",
        },
    ],
    guru: [
        { name: "Beranda", icon: <FaHome />, routeName: "guru.dashboard" },
        {
            name: "Mata Pelajaran",
            icon: <FaBook />,
            routeName: "guru.mapel.index",
        },
        { name: "Materi", icon: <FaFileAlt />, routeName: "guru.materi.index" }
    ],
    siswa: [
        { name: "Beranda", icon: <FaHome />, routeName: "siswa.dashboard" },
        {
            name: "Mata Pelajaran",
            icon: <FaBook />,
            routeName: "siswa.mapel.index",
        },
    ],
};

const Sidebar = ({ sidebarOpen, user }) => {
    const role = user.role;

    return (
        <div
            className={`fixed w-64 ${
                sidebarOpen ? "w-72" : "w-64"
            }min-w-max h-screen z-20 lg:transform-none p-3 ease-in-out duration-200 px-3 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-full h-full rounded-xl bg-green-800 shadow-xl dark:bg-gray-800 selection:bg-red-500 selection:text-white">
                <div className="ml-2 mb-6 pt-4">
                    <Link href="/" className="flex items-center mb-5">
                        <span className="self-center px-4 text-3xl text-white font-semibold whitespace-nowrap dark:text-white">
                            MANUeLearn
                        </span>
                    </Link>
                </div>
                <div>
                    <div>
                        <div className="bg-white py-1 mb-4"></div>
                    </div>
                </div>
                <div className="flex flex-col h-full">
                    {roleLinks[role].map((link, index) => (
                        <SidebarLink
                            key={index}
                            active={route().current(link.routeName)}
                            name={link.name}
                            routeName={link.routeName}
                            icon={link.icon}
                        />
                    ))}
                    <SidebarLink
                        name="Logout"
                        routeName="logout"
                        className="mt-8 bottom-8 flex items-center text-white hover:bg-blue-100 hover:text-blue-700 py-2 transition-all rounded-xl px-6 text-xl"
                        icon={<FaSignOutAlt />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
