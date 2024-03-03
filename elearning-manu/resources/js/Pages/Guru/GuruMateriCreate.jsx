import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateMateriForm from './Partials/CreateMateriForm';
import { Head } from '@inertiajs/react';

const GuruCreateMateri = ({ auth , pelajaran_id}) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Tambah Materi Baru'}>
      <Head title="Tambah Materi Baru" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <CreateMateriForm className="max-w-xl" pelajaran_id = {pelajaran_id}/>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruCreateMateri;