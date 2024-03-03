import React, { useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
} from "@tanstack/react-table";
import DebouncedInput from "@/Components/DebauncedInput";
import { BsEye } from "react-icons/bs";
import { MdFileDownload } from 'react-icons/md';
import { Link, router } from "@inertiajs/react";
import {
    FaFilePdf,
    FaFileWord,
    FaFilePowerpoint,
    FaFile,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

// import { SearchIcon } from "../Icons/Icons";

const ListMateriTable = ({ data }) => {
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

    const getVideoIcon = (videoLink) => {
        if (!videoLink) return null;

        // Ambil ID video dari link YouTube menggunakan regular expression
        const videoIdMatch = videoLink.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );

        if (videoIdMatch && videoIdMatch[1]) {
            // Mengembalikan ikon YouTube jika ada video
            return (
                <div className="flex items-center">
                    <AiOutlineYoutube className="text-red-500 text-3xl" />
                    <span className="ml-2">Link Video</span>
                </div>
            );
        }

        // Jika bukan link YouTube, kembalikan null
        return null;
    };
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("index", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "No",
        }),
        columnHelper.accessor("nama", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Judul Materi",
        }),
        columnHelper.accessor("file_materi", {
            cell: (info) => (
                <div className="flex justify-row">
                    <span className="text-3xl">
                        {getFileIcon(info.getValue())}
                    </span>
                    <span className="px-2 pt-1">{info.getValue()}</span>
                </div>
            ),
            header: "File",
        }),
        columnHelper.accessor("video", {
            cell: (info) => (
                <span>
                    {getVideoIcon(info.getValue()) || "Tidak ada video"}
                </span>
            ),
            header: "Video",
        }),
        {
            cell: (info) => (
                <div className="flex gap-1">
                    <Link
                        href={`/siswa/materi/${info.row.original.id}`}
                        className="bg-yellow-400 p-2 rounded hover:bg-amber-500 transition"
                    >
                        <BsEye />
                    </Link>
                </div>
            ),
            header: "Aksi",
        },
    ];

    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting: sorting,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
    });

    return (
        <div className="p-4 mx-auto fill-gray-400 bg-white shadow-md rounded-xl dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="flex justify-between mb-2">
                <div className="w-full flex items-center gap-1">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 bg-white rounded-lg border w-3/5 lg:w-1/5 focus:w-4/5 lg:focus:w-1/3 duration-300 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                        placeholder="Cari materi terbaru..."
                    />
                </div>
            </div>
            <div className="max-w-full overflow-x-auto pb-4">
                <table className=" w-full text-left text-gray-900 text-md ">
                    <thead className="bg-white dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="capitalize px-3.5 py-2"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            { asc: "⬆️", desc: "⬇️" }[
                                                header.column.getIsSorted() ??
                                                    null
                                            ]
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`
                ${
                    i % 2 === 0
                        ? "bg-green-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
                        : "bg-white"
                }
                text-green-800 dark:text-gray-400`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-3.5 py-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center h-32 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                                <td colSpan={12}>No Recoard Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            <div className="hidden sm:flex items-center justify-end mt-2 gap-2">
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className="p-1 border border-gray-500 px-2 disabled:opacity-50 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className="p-1 border border-gray-500 px-2 disabled:opacity-50 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                >
                    {">"}
                </button>

                <span className="flex items-center gap-1 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16 bg-white dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                    />
                </span>
                <label
                    htmlFor=""
                    className="dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                >
                    Show
                </label>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="py-1 px-2 w-16 bg-white rounded border-gray-500 cursor-pointer dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                >
                    {[10, 20, 30, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ListMateriTable;
