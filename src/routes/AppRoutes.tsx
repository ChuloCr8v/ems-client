import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const UserPages = lazy(() => import("../views/UserPages"));
// const Auth = lazy(() => import("../views/auth/Auth"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserPages />} />

      {/* Auth */}
      
    </Routes>
  );
};

export default AppRoutes;
