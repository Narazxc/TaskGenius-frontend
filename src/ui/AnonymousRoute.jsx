import { PulseLoader } from "react-spinners";
import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";

function AnonymousRoute({ children }) {
  // 1) Load authenticated user
  const { isLoading, user } = useUser();

  // 3) While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <PulseLoader color="#4a1d96" speedMultiplier={0.75} size={24} />
      </div>
    );
  // 4) If there is a user render the app
  if (!user) {
    <Navigate to="/login" replace />;
  } else {
    return children;
  }
}

export default AnonymousRoute;
