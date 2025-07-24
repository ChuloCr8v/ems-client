import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";
import Employees from "../views/employees/Employees";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
};

export default ProtectedRoutes;
