import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();

  const safeRoutes = ["/onboarding/invitation"];

  const isSafeRoute = safeRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (isSafeRoute) return;

      if (!isSafeRoute && !user.id) {
        navigate("/auth");
      }

      if (isSafeRoute && user.id) {
        navigate("/employees");
      }
    };

    checkAuth();
  }, [user, location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
