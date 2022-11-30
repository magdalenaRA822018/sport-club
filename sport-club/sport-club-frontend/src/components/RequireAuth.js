import {useLocation, Navigate, Outlet} from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import {React} from 'react'
const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

    return (
       /* auth?.role?.find(role => allowedRoles?.includes(role))
            true
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />*/
            <Outlet />
    );
}
export default RequireAuth;
