import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import MapelCardMateri from '@/Pages/Guru/Partials/MapelCardMateri';
import { Head } from '@inertiajs/react';

const GuruMateri = ({ mapel , auth }) => {
  console.log(mapel);
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
          
        <MapelCardMateri data={data} />
        ))}
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruMateri;
