import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../context/auth-context';
const RequireAuth = ({allowedRoles}) => {
    const authContext = useContext(AuthContext);
    console.log("REQUIREAUTH.JS")

    return (
        allowedRoles.includes(authContext.role) ? <Outlet /> : <Navigate to="/" replace />
   );
}
export default RequireAuth;
