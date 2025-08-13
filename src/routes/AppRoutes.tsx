import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../views/extra/404";
const AuthPages = lazy(() => import("./AuthPages"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
export const Layout = lazy(() => import("../views/layout/Layout"));
export const InvitationFlow = lazy(
  () => import("../views/auth/InvitationFlow")
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/onboarding/invitation" element={<InvitationFlow />} />

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
