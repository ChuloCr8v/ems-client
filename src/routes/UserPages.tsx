import { Route, Routes } from "react-router-dom";
import Layout from "../views/layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";

const UserPages = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <ProtectedRoutes />
          </Layout>
        }
      />
    </Routes>
  );
};

export default UserPages;
