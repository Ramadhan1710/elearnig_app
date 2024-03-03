import React from 'react';
import { Link } from '@inertiajs/react';
import { FaChalkboard, FaHome } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { AiOutlineBook } from 'react-icons/ai';
import { BsBook } from 'react-icons/bs';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import { FaSignOutAlt } from 'react-icons/fa';

const SidebarLink = ({ active = false, className = '', name, routeName, ...props }) => {
  return (
    <div className="px-2 mb-2">
      {name === 'Logout' ? (
      <Link
        {...props}
        href={route(routeName)}
        method='post'
        as='button'
        className={`flex items-center hover:bg-white w-full hover:text-green-800 py-2 transition-all rounded-xl px-6 text-xl  ${active
            ? 'border-indigo-400 dark:border-indigo-600 text-green-900 dark:text-indigo-300 bg-white dark:bg-indigo-900/50 focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 text-xl'
            : 'border-transparent text-white dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600'
          } ${className}`}
      ><FaSignOutAlt className="mr-3" /> <span className=''>{name}</span></Link>
      ) : (
      <Link
        {...props}
        href={route(routeName)}
        className={`flex items-center hover:bg-white hover:text-green-800 py-2 transition-all rounded-xl px-6 text-xl  ${active
            ? 'border-indigo-400 dark:border-indigo-600 text-green-900 dark:text-indigo-300 bg-white dark:bg-indigo-900/50 focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 text-xl'
            : 'border-transparent text-white dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600'
          } ${className}`}
      >
        {name === 'Beranda' ? (
          <FaHome className="mr-3" />
        ) : name === 'Guru' ? (
          <FaChalkboardTeacher className="mr-3" />
        ) : name === 'Siswa' ? (
          <FaUserGraduate className="mr-3" />
        ) : name === 'Mata Pelajaran' ? (
          <AiOutlineBook className="mr-3" />
        ) : name === 'Kelas' ? (
          <FaChalkboard className="mr-3" />
        ) : name === 'Materi' ? (
          <BsBook className="mr-3" />
        ) : name === 'Tugas' ? (
          <MdOutlineAssignmentTurnedIn className="mr-3" />
        ) : name === 'Nilai' ? (
          <GrScorecard className="mr-3" />
        ) : (
          ''
        )}
        <span className=''>{name}</span>
      </Link>)}

    </div>
  );
};

export default SidebarLink;
