import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import MapelDataTable from '@/Pages/Admin/Partials/MapelDataTable';
import { Head } from '@inertiajs/react';

const AdminMapel = ({ mapel, auth }) => {
    const datas = mapel.map((mapels, index) => ({
        id: mapels.id,
        index: index + 1,
        mapel: mapels.mapel,
        kelas: `${mapels.kelas.range_kelas} ${mapels.kelas.program_studi}`,
        guru: mapels.guru.user.name ? mapels.guru.user.name : null
    }));

    return (
        <AuthenticatedLayoutNew user={auth.user} header={'Data Mata Pelajaran'}>
            <Head title="Data Mata Pelajaran" />
            <div className='px-3'>
                <MapelDataTable data={datas} jumlahmapel={mapel.length} />
            </div>
        </AuthenticatedLayoutNew>
    );
};

export default AdminMapel;
