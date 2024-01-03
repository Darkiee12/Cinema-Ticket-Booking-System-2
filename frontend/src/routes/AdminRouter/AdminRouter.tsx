import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../admin/Dashboard.tsx";
import AdminUsers from "../../admin/AdminUsers.tsx";
import AdminSettings from "../../admin/AdminSettings.tsx";
import AddMovie from "../../admin/AddMovie.tsx";
import AddCinema from "../../admin/AddCinema.tsx";

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
