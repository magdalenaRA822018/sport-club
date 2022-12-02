import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
   
    return (
         allowedRoles.includes(auth.roles) ? <Outlet /> : <Navigate to="/" replace />
    );
}

export default RequireAuth;