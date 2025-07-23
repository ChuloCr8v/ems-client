import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";
import ForgotPassword from "../views/auth/ForgotPassword";
import Inbox from "../views/auth/Inbox";
import InvitationFlow from "../views/auth/InvitationFlow";
import Login from "../views/auth/Login";
import EditOnboardingInfo from "../views/auth/EditOnboardingInfo";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/Dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/*" element={<Login />} />
      <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
      <Route path="/auth/inbox" element={<Inbox />} />
      <Route path="/auth/invitation" element={<InvitationFlow />} />
      <Route path="/auth/edit" element={<EditOnboardingInfo />} />
      <Route path="/*" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};

export default ProtectedRoutes;
