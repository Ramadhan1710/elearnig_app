import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditMateriForm from './Partials/EditMateriForm';
import { Head } from '@inertiajs/react';

const GuruMateriEdit = ({ auth , materi, mapel}) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Edit Data Baru Materi'}>
      <Head title="Edit Data Baru Materi" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-3">
        <EditMateriForm className="max-w-xl" materi={materi} mapel={mapel}/>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruMateriEdit;