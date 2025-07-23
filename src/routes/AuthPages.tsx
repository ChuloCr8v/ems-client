import { Route, Routes } from "react-router-dom";
import Login from "../views/auth/login";
import ForgotPassword from "../views/auth/ForgotPassword";

const UserPages = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default UserPages;
