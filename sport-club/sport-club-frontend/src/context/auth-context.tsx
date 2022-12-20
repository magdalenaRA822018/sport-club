import React, { createContext,useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UserTokenState } from '../interfaces';

interface AppContextInterface {
  isAuth: boolean;
  token: string;
  expiresIn: number;
  role: string;
  username: string;
  login(tokenState: UserTokenState): void;
}

export const AuthContext=createContext<AppContextInterface | null> (null);
let logoutTimer:any;


const AuthContextProvider = (props :any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<number>(0);
  const [role, setRole] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate=useNavigate()
  

  const login = (tokenState:UserTokenState) => {
    console.log("login henlder"+tokenState)
    setIsAuthenticated(true)
    setToken(tokenState.accessToken)
    setExpiresIn(tokenState.expiresIn)
    setRole(tokenState.roles)
    setUsername(tokenState.username)
    logoutTimer = setTimeout(logoutHandler, tokenState.expiresIn);
    navigate("/editor/sportclubs")
  } 
  
  
  const logoutHandler = () => {
    setIsAuthenticated(false)
    setToken('');
    setExpiresIn(0)
    setRole('')
    setUsername('')
    if (logoutTimer) clearTimeout(logoutTimer);
  }

 

  console.log("AUTHCONTEXT.JS")
  return (
    <AuthContext.Provider
      value={{ 
        isAuth: isAuthenticated , 
        token: token, 
        expiresIn: expiresIn, 
        role: role, 
        username: username,
        login:  login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;