import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";
import Employees from "../views/employees/Employees";
import Assets from "../views/assets/Assets";
import EmployeeProfile from "../views/employees/EmployeeProfile";
import Departments from "../views/departments/Departments";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<EmployeeProfile />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/departments" element={<Departments />} />
    </Routes>
  );
};

export default ProtectedRoutes;
