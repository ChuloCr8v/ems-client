import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";
import Inbox from "../views/auth/Inbox";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};

export default ProtectedRoutes;
