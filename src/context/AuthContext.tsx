import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserRequired } from "../hooks/authHooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthUserRequired();

  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    async () => {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/auth");
      }
    };
  }, [user]);

  // if (loading) return <LoadingSpinner />;

  return <div>{children}</div>;
};

export default AuthProvider;
