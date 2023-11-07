// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../components/hooks/useAuth";

// const RequireAuth = () => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return (auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />);
// };

// export default RequireAuth;
import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../components/hooks/useAuth";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Booking from "../Pages/Booking";

const RequireAuth = ({ children }) => {
  // const { auth } = useAuth();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? (
    <Booking />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
