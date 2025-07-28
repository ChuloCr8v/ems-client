import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthUser();
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    const checkAuth = async () => {
      if (user.id !== "") {
        navigate("/employees");
      } else {
        navigate("/auth/");
      }
    };

    checkAuth();
  }, [user]);

  return <>{children}</>;
};

export default AuthProvider;
