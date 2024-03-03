import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditKelasForm from './Partials/EditKelasForm';
import { Head } from '@inertiajs/react';

const AdminKelasEdit = ({ auth, kelas }) => {
  return (
    <AuthenticatedLayoutNew
      user={auth.user}
      header={`Edit Data Kelas ${kelas.range_kelas} ${kelas.program_studi}`}
    >
      <Head title={`Edit Data Kelas`} />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <EditKelasForm className="max-w-xl" kelas={kelas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminKelasEdit;