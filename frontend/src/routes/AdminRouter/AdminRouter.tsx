import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/Dashboard";
import AdminUsers from "../../admin/AdminUsers";
import AdminSettings from "../../admin/AdminSettings";
import AddMovie from "../../admin/AddMovie";
import AddCinema from "../../admin/AddCinema";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="/add-movies" element={<AddMovie />} />
      <Route path="/add-Cinema" element={<AddCinema />} />
      {/* Add more admin-related routes here */}
    </Routes>
  );
};

export default AdminRouter;
