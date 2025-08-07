import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../api/users";
import { useAppSelector } from "../hooks/reduxHooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authToken = useAppSelector((state) => state.auth?.access_token);

  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !authToken,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const safeRoutes = ["/onboarding/invitation"];

  const isSafeRoute = safeRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (isLoading) return;

    if (!isSafeRoute && !user) {
      navigate("/auth");
    }

    if (user && location.pathname === "/auth") {
      navigate("/employees");
    }
  }, [user, isLoading, isSafeRoute, location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
