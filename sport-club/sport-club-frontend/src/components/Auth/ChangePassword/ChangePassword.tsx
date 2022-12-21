import React, { useState,  useCallback, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import { Credentials } from '../../../interfaces';
import axios from '../../../http-common';
import swal from 'sweetalert';

import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
import './ChangePassword.css';
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
    <div className="changePassword">
    <Card>
      <CardBody>
      <h1 className='h1' >Change password</h1>
      <br/>
       <Form onSubmit={changePasswordHandler}>
       <FormGroup >
          <Label for="password">New password</Label>
          <Input id="password"  
                value={enteredPassword}  onChange={event => {
                  setEnteredPassword(event.target.value); 
                }}
             type="password" required/>
       </FormGroup>

        <FormGroup>
          <Label for="confirmPassword">Confirm new password</Label>
          <Input id="confirmPassword"  value={confirmedPassword}  onChange={event => {
                setConfirmedPassword(event.target.value);
              }} type="password"  required/>
        </FormGroup>
        <Button className="submitNewPasswordButton"  >Save new password</Button>
        </Form>
       </CardBody>
    </Card>
    </div>
   
  );
};

export default ChangePassword;
