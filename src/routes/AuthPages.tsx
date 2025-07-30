import { Route, Routes } from "react-router-dom";
import Login from "../views/auth/login";
import ForgotPassword from "../views/auth/ForgotPassword";
import Inbox from "../views/auth/Inbox";

const AuthPages = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/inbox" element={<Inbox />} />

      {/* <Route path="/edit" element={<EditOnboardingInfo />} /> */}
    </Routes>
  );
};

export default AuthPages;
