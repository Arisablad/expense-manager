import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
