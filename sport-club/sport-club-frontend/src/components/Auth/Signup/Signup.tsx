import React, { useState,  useCallback, useEffect, useRef }  from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import useHttp from '../../../hooks/useHttp';
const Signup = () => {

  const ACC_TYPE = [
   {
      name: 'EDITOR',
      value: 'ROLE_EDITOR',
      url: 'auth/editor'
    },
    {
      name: 'VIEWER',
      value: 'ROLE_VIEWER',
      url: 'auth/viewer'
    }
  ]

  const NAMES_REGEX=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errRef = useRef();

  const [enteredFirstName, setEnteredFirstName]= useState('');
  const [enteredLastName, setEnteredLastName]= useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [selected, setSelected] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  
  const {
    data,
    sendRequest,
  } = useHttp();

  const optionchanged = (e : Event) => {
    /*
      console.log(e.target.value)
    setSelected(e.target.value);
    */
  };
  
  const validInput = () =>{
    if(!NAMES_REGEX.test(enteredFirstName)){
      setErrMsg('Invalid first name input') ;
      return false;
    }else if(!NAMES_REGEX.test(enteredLastName)){
      setErrMsg('Invalid last name input') ;
      return false;
    }else if(!EMAIL_REGEX.test(enteredUsername)){
      setErrMsg('Invalid email input') ;
      return false;
    }else if(!PASSWORD_REGEX.test(enteredPassword)){
      setErrMsg('Invalid password input') ;
      return false;
    }
      return true;
  }
 /* const signUp= useCallback( (signupDto,url) => {
      sendRequest(
        url,
        'POST',
        JSON.stringify(signupDto),
        null,
        'SIGNUP'
      );
      
  }, [sendRequest]);*/

  useEffect(()=>{
      if(data!=null){
        if(data.content==="Success")
         console.log("Succes")
         //  swal({ icon: 'success', title: "Success",});
        else 
        console.log("Err")
          // swal({ icon: 'error', title: "Error",});
      }
  }, [data])

 

  const signUpHandler = (e: Event) => {
      e.preventDefault();
     if(!validInput()) return; 

     const signupDto = {
      username: enteredUsername,
      password: enteredPassword,
      firstname: enteredFirstName,
      lastname: enteredLastName,
      role: ACC_TYPE[selected].value
     }
     //signUp(signupDto,ACC_TYPE[selected].url)
    }

  return (
    <div className="signup">
    
    </div>
   
  );
};

export default Signup;
