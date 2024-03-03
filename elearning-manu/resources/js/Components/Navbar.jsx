import React from "react";
import Dropdown from "@/Components/Dropdown";
import { AiOutlineMenu } from "react-icons/ai";
import UserIcon from "./UserIcon";

const Navbar = ({ user, setSidebarOpen, header }) => {
    return (
        <header className="p-3 w-full lg:w-5/6 ml-auto dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
            <nav
                className={`bg-white rounded-xl shadow-md flex h-20 items-center justify-between px-6 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white`}
            >
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)}>
                        <AiOutlineMenu className="lg:hidden dark:text-white" />
                    </button>
                    <p className="text-sm sm:text-lg lg:text-2xl text-gray-600 dark:text-white font-semibold">
                        {header}
                    </p>
                </div>
                <div className="flex sm:flex sm:items-center sm:ms-1">
                    <div className="ms-3 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="flex items-center py-2 border border-transparent text-sm sm:text-lg lg:text-xl rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}{" "}
                                        {user.role === "guru"
                                            ? "- Guru"
                                            : user.role === "admin"
                                            ? "- Admin"
                                            : "- Siswa"}
                                        <div
                                            className={`mx-2 bg-green-800 text-white rounded-full `}
                                        >
                                            <UserIcon user={user} />
                                        </div>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={
                                        user.role === "guru"
                                            ? route("guruProfile.show")
                                            : user.role === "admin"
                                            ? route("adminProfile.show")
                                            : route("siswaProfile.show")
                                    }
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
