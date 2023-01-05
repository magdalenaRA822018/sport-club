import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../context/auth-context';
import { useAppSelector } from '../store/store';
interface Props{
   allowedRoles: Array<string>;
}
const RequireAuth = ({allowedRoles}: Props) => { 
    const token = localStorage.getItem('token')
    const userTokenState = useAppSelector((state) => state.user.userTokenState)
    return (
      (allowedRoles.includes(userTokenState.roles) && token) ? <Outlet/> : <Navigate to="/" replace />
   );
}
export default RequireAuth;
