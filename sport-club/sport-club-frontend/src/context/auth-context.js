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

  const refresh = useCallback(loginDto => {
        
    sendRequest(
      'auth/refresh',
      'POST',
      null,
      token,
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

 /* const checkIfTokenHasToBeRefreshed = () => {
    
      const remainingTime = calculateRemainingTime(expiresIn);
    
      if (remainingTime <= 3600) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userData");
        return null;
      }
    
      return {
        token: storedToken,
        duration: remainingTime,
      };
    };


  const calculateRemainingTime = (expiresIn) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expiresIn).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };
*/
 
  useEffect(()=>{
    if(data!=null){
      if(data.username!==''){
        setIsAuthenticated(true)
        setToken(data.accessToken)
        setExpiresIn(data.expiresIn)
        setRole(data.roles)
        setUsername(data.username)

        if(data.roles==="ROLE_EDITOR")
         navigate("/editor/sportclubs", { replace: true });
        else if(data.roles==="ROLE_VIEWER")
         navigate("/viewer/sportclubs", { replace: true });
      }else{
        swal({ icon: 'error', title: "Bad credentials",});
      }
      
    }
  }, [data])

  console.log("AUTHCONTEXT.JS")
  return (
    <AuthContext.Provider
      value={{ 
        login: loginHandler,  
        logout: logoutHandler, 
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