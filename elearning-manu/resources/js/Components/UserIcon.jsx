import React from 'react';
import { RiAdminFill} from 'react-icons/ri';
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";

const UserIcon = ({ user }) => {
  if (user.role === 'admin') {
    return <RiAdminFill className="m-3" />;
  } else if (user.role === 'siswa') {
    return <PiStudentFill className="m-3" />;
  } else if (user.role === 'guru') {
    return <PiChalkboardTeacherFill className="m-3" />;
  } else {
    return null;
  }
};

export default UserIcon;
