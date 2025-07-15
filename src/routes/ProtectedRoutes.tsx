import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";

import Login from "../views/auth/login";
import ForgotPassword from "../views/auth/ForgotPassword";
import Inbox from "../views/auth/Inbox";

import InvitationFlow from "../views/auth/InvitationFlow";



const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/Dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/*" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
      <Route path="/auth/inbox" element={<Inbox />} />
      <Route path="/auth/invitation" element={<InvitationFlow/>} />
    </Routes>
  );
};

export default ProtectedRoutes;
