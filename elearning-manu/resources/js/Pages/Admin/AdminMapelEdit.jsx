import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditMapelForm from './Partials/EditMapelForm';
import { Head } from '@inertiajs/react';

const AdminMapelEdit = ({ auth , mapel, kelas, guru}) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={`Edit Mata Pelajaran ${mapel.mapel}`}>
      <Head title="Edit Mata Pelajaran" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3 dark:bg-dots-lighter dark:bg-gray-800 selection:bg-red-500 selection:text-white dark:text-white">
        <EditMapelForm className="max-w-xl" mapel={mapel} kelas={kelas} guru={guru} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminMapelEdit;