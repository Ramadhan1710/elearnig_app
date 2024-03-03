import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import MapelCard from '@/Pages/Guru/Partials/MapelCard';
import { Head } from '@inertiajs/react';

const GuruMapel = ({ mapel , auth }) => {
  const datas = mapel.map((mapels) => ({
    id: mapels.id,
    mapel: mapels.mapel,
    kelas: `${mapels.kelas.range_kelas} ${mapels.kelas.program_studi}`
  }));

  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Daftar Mata Pelajaran'}>
      <Head title="Daftar Mata Pelajaran" />
      <div className='px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {datas.map((data) => (
          
        <MapelCard data={data} />
        ))}
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruMapel;
