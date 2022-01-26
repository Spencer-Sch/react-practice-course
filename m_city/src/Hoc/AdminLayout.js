import React, { useEffect } from 'react';
import AdminNav from '../Components/Admin/Nav/AdminNav';

const AdminLayout = (props) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
