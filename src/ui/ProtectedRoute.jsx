import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) Load authenticated user
  const { isLoading, user } = useUser();

  // 2) If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!user && !isLoading) navigate("/login");
    },
    [user, isLoading, navigate],
  );

  // 3) While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );
  // 4) If there is a user render the app
  if (user) return children;
}

export default ProtectedRoute;
