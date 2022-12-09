import React, { useState, useCallback, useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
export const AuthContext = React.createContext({
  isAuth: false,
  token: '',
  expiresIn: 0,
  role: '',
  username: '',
  login: () => {},
  logout: () => {},
  checkToken: () => {},
});
let logoutTimer;


const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const navigate=useNavigate();
  
  const {
    data,
    sendRequest,
    methodName
  } = useHttp();

  

  const loginHandler = useCallback(loginDto => {
        
        sendRequest(
          'auth/login',
          'POST',
          JSON.stringify(loginDto),
          loginDto,
          'LOGIN'
        );

        }, [sendRequest]
  );


  
  
  const logoutHandler = useCallback(() => {

    setIsAuthenticated(false)
    setToken('');
    setExpiresIn(0)
    setRole('')
    setUsername('')

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
 
  useEffect(()=>{
    if(data!=null){
      if(methodName==="LOGIN"){
      if(data.username!==''){
        setIsAuthenticated(true)
        setToken(data.accessToken)
        setExpiresIn(data.expiresIn)
        setRole(data.roles)
        setUsername(data.username)

        logoutTimer = setTimeout(logoutHandler, data.expiresIn);
        

        if(data.roles==="ROLE_EDITOR")
         navigate("/editor/sportclubs", { replace: true });
        else if(data.roles==="ROLE_VIEWER")
         navigate("/viewer/sportclubs", { replace: true })
      }else{
        swal({ icon: 'error', title: "Bad credentials",});
      }
    }else if(methodName==='REFRESH'){
      setIsAuthenticated(true)
        setToken(data.accessToken)
        setExpiresIn(data.expiresIn)
        setRole(data.roles)
        setUsername(data.username)

    }
      
    }
  }, [data])
 

  console.log("AUTHCONTEXT.JS")
  return (
    <AuthContext.Provider
      value={{ 
        login: loginHandler,  
        logout: logoutHandler, 
        checkToken: null,
        isAuth: isAuthenticated , 
        token: token, 
        expiresIn: expiresIn, 
        role: role, 
        username: username}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;