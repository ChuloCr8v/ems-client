import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/Dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default ProtectedRoutes;
