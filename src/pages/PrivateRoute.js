import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUserAuthenticated = isAuthenticated && user;

  if (!isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
