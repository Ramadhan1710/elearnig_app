import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateGuruForm from '@/Pages/Admin/Partials/CreateGuruForm';
import { Head } from '@inertiajs/react';

const AdminGuruCreate = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Tambah Data Guru'}>
      <Head title="Tambah Data Guru" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <CreateGuruForm className="max-w-xl" />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminGuruCreate;