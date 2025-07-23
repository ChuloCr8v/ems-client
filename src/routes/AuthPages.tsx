import { Route, Routes } from "react-router-dom";
import Login from "../views/auth/login";
import ForgotPassword from "../views/auth/ForgotPassword";
import EditOnboardingInfo from "../views/auth/EditOnboardingInfo";
import Inbox from "../views/auth/Inbox";
import InvitationFlow from "../views/auth/InvitationFlow";

const UserPages = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
      <Route path="/auth/inbox" element={<Inbox />} />
      <Route path="/auth/invitation" element={<InvitationFlow />} />
      <Route path="/auth/edit" element={<EditOnboardingInfo />} />
    </Routes>
  );
};

export default UserPages;
