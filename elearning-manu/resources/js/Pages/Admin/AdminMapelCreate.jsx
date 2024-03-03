import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateMapelForm from './Partials/CreateMapelForm';
import { Head } from '@inertiajs/react';

const AdminMapelCreate = ({ auth , kelas, guru}) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Tambah Data Kelas'}>
      <Head title="Tambah Data Guru" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
        <CreateMapelForm className="max-w-xl" kelas={kelas} guru={guru}/>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminMapelCreate;