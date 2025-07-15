import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoutes from "../routes/ProtectedRoutes";


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
