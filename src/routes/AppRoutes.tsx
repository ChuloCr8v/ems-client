import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../views/extra/404";

const AuthPages = lazy(() => import("./AuthPages"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const Layout = lazy(() => import("../views/layout/Layout"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthPages />} />

      <Route
        path="/*"
        element={
          <Layout>
            <ProtectedRoutes />
          </Layout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
