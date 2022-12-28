import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../context/auth-context';

interface Props{
   allowedRoles: Array<string>;
}
const RequireAuth = ({allowedRoles}: Props) => {
    const authContext: any = useContext(AuthContext);<Outlet /> 
    const token = localStorage.getItem('token')
    return (
      (allowedRoles.includes(authContext.role) && authContext.isAuth ) ? 
      token ?  <Outlet/> : <Navigate to="/" replace /> 
       : <Navigate to="/" replace />
   );
}
export default RequireAuth;
