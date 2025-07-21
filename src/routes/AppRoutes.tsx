import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const UserPages = lazy(() => import("../routes/UserPages"));
const AuthPages = lazy(() => import("../routes/AuthPages"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPages />} />
      <Route path="*" element={<UserPages />} />
    </Routes>
  );
};

export default AppRoutes;
