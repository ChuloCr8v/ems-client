import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const UserPages = lazy(() => import("../views/UserPages"));
const Login = lazy(() => import("../views/auth/login"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserPages />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
