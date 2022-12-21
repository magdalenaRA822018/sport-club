import React, { createContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserTokenState } from '../interfaces';
import axios from '../http-common';
interface AppContextInterface {
  isAuth: boolean;
  token: string;
  expiresIn: number;
  role: string;
  username: string;
  login(tokenState: UserTokenState): void;
  logout(): void;
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
    axios.defaults.headers.common['Authorization']=`Bearer ${tokenState.accessToken}`
    setIsAuthenticated(true)
    setToken(tokenState.accessToken)
    setExpiresIn(tokenState.expiresIn)
    setRole(tokenState.roles)
    setUsername(tokenState.username)
    logoutTimer = setTimeout(logout, tokenState.expiresIn);
    if(tokenState.roles=='ROLE_EDITOR')  navigate('/editor/sportclubs')
    else if(tokenState.roles=='ROLE_VIEWER')  navigate('/viewer/sportclubs')
  } 
  
  
  const logout = () => {
    axios.defaults.headers.common['Authorization']=null
    setIsAuthenticated(false)
    setToken('');
    setExpiresIn(0)
    setRole('')
    setUsername('')
    if (logoutTimer) clearTimeout(logoutTimer);
  }

  return (
    <AuthContext.Provider
      value={{ 
        isAuth: isAuthenticated , 
        token: token, 
        expiresIn: expiresIn, 
        role: role, 
        username: username,
        login:  login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;