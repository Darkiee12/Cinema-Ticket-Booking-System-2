import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '../../admin/AdminDashboard';
import AdminUsers from '../../admin/AdminUsers';
import AdminSettings from '../../admin/AdminSettings';

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/users" element={<AdminUsers />} />
      <Route path="admin/settings" element={<AdminSettings />} />
      {/* Add more admin-related routes here */}
    </Routes>
  );
};

export default AdminRouter;
