import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/AdminDashboard";
import AdminUsers from "../../admin/AdminUsers";
import AdminSettings from "../../admin/AdminSettings";
import AddMovie from "../../admin/AddMovie";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="/add-movies" element={<AddMovie />} />
      {/* Add more admin-related routes here */}
    </Routes>
  );
};

export default AdminRouter;
