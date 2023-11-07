// eslint-disable-next-line
import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../components/hooks/useAuth";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Admin from "../Pages/Admin";

const AdminAuth = ({ children }) => {
  // const { auth } = useAuth();
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line
  const location = useLocation();
  console.log(user.isAdmin);

  return user.isAdmin ? (
    <Admin />
  ) : (
    // <Navigate to="/login" state={{ from: location }} replace />
    <div>You are not authorized for this path</div>
  );
};

export default AdminAuth;
