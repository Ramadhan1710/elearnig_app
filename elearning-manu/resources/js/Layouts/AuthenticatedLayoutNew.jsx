import { useState, React } from "react";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function Authenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-green-200 dark:bg-gray-900">
            <Sidebar sidebarOpen={sidebarOpen} user={user} />
            <Navbar
                user={user}
                setSidebarOpen={setSidebarOpen}
                header={header}
            />
            <div
                className={`bg-black opacity-50 fixed lg:hidden top-0 left-0 bottom-0 right-0 ${
                    sidebarOpen === false ? "hidden" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
            ></div>
            <main className="min-h-screen w-full lg:w-5/6 ml-auto transition-all duration-200">{children}</main>
        </div>
    );
}
