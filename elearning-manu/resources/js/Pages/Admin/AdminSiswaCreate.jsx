import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateSiswaForm from './Partials/CreateSiswaForm';
import { Head } from '@inertiajs/react';

const AdminSiswaCreate = ({ auth , kelas}) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Tambah Data Kelas'}>
      <Head title="Tambah Data Guru" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
        <CreateSiswaForm className="max-w-xl" kelas={kelas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSiswaCreate;