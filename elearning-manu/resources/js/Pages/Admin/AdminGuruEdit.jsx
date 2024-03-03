import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditGuruForm from './Partials/EditGuruForm';
import { Head } from '@inertiajs/react';

const AdminGuruEdit = ({ auth, user, guru }) => {
  return (
    <AuthenticatedLayoutNew
      user={auth.user}
      header={`Edit Data Guru ${user.name}`}
    >
      <Head title={`Edit Data Guru`} />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <EditGuruForm className="max-w-xl" user={user} guru={guru} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminGuruEdit;