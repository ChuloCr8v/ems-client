import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useGetMeQuery } from "../api/data/users";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authToken = useAppSelector((state) => state.auth?.access_token);

  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !authToken,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const safeRoutes = [
    "/onboarding/invitation",
    "/onboarding/invitation/decline",
  ];

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
