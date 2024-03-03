import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import profile_default from './assets/Profile.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

const AdminProfile = ({ auth }) => {
  const ProfilePicture = auth.user.ProfilePicture;

  const rowTables = [
    {
      title: 'Nama',
      content: auth.user.name
    },
    {
      title: 'Role',
      content: auth.user.role
    },
    {
      title: 'Email',
      content: auth.user.email
    }
  ];

  return (
    <AuthenticatedLayoutNew user={auth.user} header={'Profil Admin'}>
      <Head title="Profil Admin" />

      <div className="mx-3 mb-3 p-6 bg-white rounded-xl shadow-md">
        <div>
          <img
            src={
              ProfilePicture
                ? `/profile_picture/${ProfilePicture}`
                : profile_default
            }
            alt="profilImg"
            className="w-32 object-cover rounded-full shadow-md"
          />
        </div>
        <div className="py-4">
          <ProfileDetailItem rows={rowTables} />
        </div>
        <div>
          <Link href={route('adminProfile.edit')}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminProfile;