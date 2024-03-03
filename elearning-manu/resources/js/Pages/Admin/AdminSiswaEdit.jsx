import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditSiswaForm from './Partials/EditSiswaForm';
import { Head } from '@inertiajs/react';

const AdminSiswaEdit = ({ auth, user, siswa ,kelas}) => {
  return (
    <AuthenticatedLayoutNew
      user={auth.user}
      header={`Edit Data Siswa ${user.name}`}
    >
      <Head title={`Edit Data Guru`} />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <EditSiswaForm className="max-w-xl" user={user} siswa={siswa} kelas={kelas}/>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSiswaEdit;