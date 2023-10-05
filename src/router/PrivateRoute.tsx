import { Navigate } from "react-router-dom";
import { useUserStore } from "@/providers/ZusStore.tsx";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  if (Object.keys(user).length > 0) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
