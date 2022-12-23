import React, { useState,  useCallback, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import { Credentials } from '../../../interfaces';
import axios from '../../../http-common';
import swal from 'sweetalert';

import Input from '../../styled/Input';
import Card from '../../styled/Cards/Card';
import GreenButton from '../../styled/Buttons/GreenButton';
import Wrapper from '../../styled/Wrappers/Wrapper';
const ChangePassword = () => {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [enteredPassword, setEnteredPassword]= useState<string>('');
  const [confirmedPassword, setConfirmedPassword]= useState<string>('');
  const authContext: any=useContext(AuthContext);

  const validInput = () =>{
    if(enteredPassword!==confirmedPassword){
      swal({ icon: 'warning', title: 'Passwords don\'t match',});
      return false;
    }else if(!PASSWORD_REGEX.test(enteredPassword)){
      swal({ icon: 'warning', title: 'Invalid password',});
      return false;
    }
      return true;
  }

  const changePasswordHandler = (e: React.FormEvent) => {
     e.preventDefault();
     if(!validInput()) return; 

     const credentials: Credentials = {
      username: authContext.username,
      password: enteredPassword,
     }

     axios.post('users/password', credentials)
     .then(function (response) {
        alert("success")
        authContext.logout()
     })
     .catch(function (error) {
       alert("error")
     });
  }

  return (
    <Wrapper>
    <Card>
      <h1>Change password</h1>
      <br/>
       <form onSubmit={changePasswordHandler}>
     
          <label htmlFor='password' >New password</label>
          <Input id="password"  value={enteredPassword} 
           onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredPassword(event.target.value)}}
             type="password" required/>


          <label htmlFor='confirmPassword' >Confirm new password</label>
          <Input id="confirmPassword"  value={confirmedPassword} type="password" 
            onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setConfirmedPassword(event.target.value)}}
          required/>
      
        <GreenButton type='submit'  >Save new password</GreenButton>
        </form>
    </Card>
    </Wrapper>
   
  );
};

export default ChangePassword;
