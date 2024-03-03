import React, { useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel
} from '@tanstack/react-table';
import defaultProfile from '@/Pages/Admin/assets/Profile.png';
import DebouncedInput from '@/Components/DebauncedInput';
import { BsEye, BsTrash3 } from 'react-icons/bs';
import { LiaEdit } from 'react-icons/lia';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

// import { SearchIcon } from "../Icons/Icons";

const SiswaKelasDataTable = ({ data }) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('index', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'No'
        }),
        columnHelper.accessor('nama', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Name'
        }),
        columnHelper.accessor('nis', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'NIS'
        }),
        columnHelper.accessor('jenis_kelamin', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Jenis Kelamin'
        }),
        columnHelper.accessor('tahun_ajaran_masuk', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Tahun Ajaran Masuk'
        })
    ];

    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting: sorting
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    });

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit(`/admin/guru/${id}`, { method: 'delete' });
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <div className="p-4 mx-auto fill-gray-400 bg-white shadow-xl rounded-xl dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white ">
            <div className="flex justify-between mb-2">
                <div className="w-full flex items-center gap-1">
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 bg-white rounded-lg border w-3/5 lg:w-1/5 focus:w-4/5 lg:focus:w-1/3 duration-300 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                        placeholder="Cari Siswa..."
                    />
                </div>
            </div>
            <div className="max-w-full overflow-x-auto pb-4">
                <table className=" w-full text-left text-gray-900 text-md mt-4">
                    <thead className="bg-green-800 dark:bg-gray-600 text-white dark:bg-">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="capitalize px-3.5 py-4"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            { asc: '⬆️', desc: '⬇️' }[
                                            header.column.getIsSorted() ?? null
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
                                    className={` ${i % 2 === 0
                                        ? "bg-green-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
                                        : "bg-white"
                                        }text-green-800 dark:text-white`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-3.5 py-3">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center h-32">
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
                    className="p-1 border border-gray-500 px-2 dark:text-white"
                >
                    {'<'}
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className="p-1 border border-gray-500 px-2 dark:text-white"
                >
                    {'>'}
                </button>

                <span className="flex items-center gap-1 dark:text-white">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1 dark:text-white">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16 bg-white dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                    />
                </span>
                <label htmlFor="" className="dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white"
                >Show</label>
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

export default SiswaKelasDataTable;
