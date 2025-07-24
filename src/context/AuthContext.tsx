import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthUser();

  const navigate = useNavigate();

  useEffect(() => {
    async () => {
      if (user) {
        navigate("/employees");
      } else {
        navigate("/auth");
      }
    };
  }, [user]);

  return <div>{children}</div>;
};

export default AuthProvider;
