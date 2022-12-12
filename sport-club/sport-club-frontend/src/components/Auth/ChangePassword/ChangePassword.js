import React, { useState,  useCallback, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import useHttp from '../../../hooks/useHttp';
import swal from 'sweetalert';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
import './ChangePassword.css';

const ChangePassword = props => {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [enteredPassword, setEnteredPassword]= useState('');
  const [confirmedPassword, setConfirmedPassword]= useState('');
  const authContext=useContext(AuthContext)

  const {
    data,
    sendRequest,
  } = useHttp();

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
  
  const changePassword = useCallback((changePasswordDto) => {
    sendRequest(
      'users/password',
      'POST',
      JSON.stringify(changePasswordDto),
      authContext.token,
      'CHANGE_PASSWORD'
    );

    }, [sendRequest]

  );
  
  useEffect(()=>{
    if(data!=null){
         if(data.content==="Success"){
            swal({ icon: 'success', title: data.content,});
            authContext.logout()
         }
         else 
          swal({ icon: 'error', title: data.content,});
    }
  }, [data])

  const changePasswordHandler = (e) => {
     e.preventDefault();
     if(!validInput()) return; 

     const changePasswordDto = {
      username: authContext.username,
      password: enteredPassword,
     }
     console.log(JSON.stringify(changePasswordDto))
     changePassword(changePasswordDto)
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
