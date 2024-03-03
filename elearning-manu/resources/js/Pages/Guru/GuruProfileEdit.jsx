import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import UpdatePasswordForm from '@/Pages/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

const GuruProfileEdit = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Edit Profil'}>
      <Head title="Edit Profile Guru" />

      <div className="sm:w-full space-y-6">
        <div className="p-4 mx-3 sm:p-8 bg-white shadow rounded-xl">
          <UpdateProfileInformationForm className="max-w-xl" user={auth.user} />
        </div>

        <div className="p-4 mx-3 sm:p-8 bg-white shadow rounded-xl">
          <UpdatePasswordForm className="max-w-xl" />
        </div>
        <div className="mx-3 sm:p-1">

        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default GuruProfileEdit;