import React, { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/http';

export const AuthContext = React.createContext({
  isAuth: false,
  token: '',
  expiresIn: 0,
  role: '',
  username: '',
  login: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [role, setRole] = useState();
  const [username, setUsername] = useState();



  const {
    data,
    sendRequest,
  } = useHttp();



  const loginHandler = useCallback(loginDto => {
        
        sendRequest(
          'http://localhost:8081/auth/login',
          'POST',
          JSON.stringify(loginDto),
          loginDto,
          'LOGIN'
        );

        }, [sendRequest]

  );
 
  useEffect(()=>{
    if(data!=null){
      if(data.username!==''){
        setIsAuthenticated(true)
        setToken(data.accesToken)
        setExpiresIn(data.expiresIn)
        setRole(data.role)
        setUsername(data.username)
      }
          
    }
  }, [data])


  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated , token: token, expiresIn: expiresIn, role: role, username: username}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;