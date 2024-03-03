import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import KelasDataTable from '@/Pages/Admin/Partials/KelasDataTabel';
import { Head } from '@inertiajs/react';

const GuruListMateri = ({ kelas, auth }) => {
  const datas = kelas.map((kelas, index) => ({
    index: index + 1,
    id: kelas.id,
    range_kelas: kelas.range_kelas,
    program_studi: kelas.program_studi,
    tahun_ajaran: kelas.tahun_ajaran,
    wali_kelas: kelas.wali_kelas,
  }));
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Daftar Kelas'}>
      <Head title="Daftar Kelas" />
      <div className='px-3'>
        <KelasDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruListMateri;