import React, { useState, useEffect,useRef }  from 'react';
import { Link } from 'react-router-dom';

import { Button, FormGroup, Form, Label, Input , Card, CardBody} from 'reactstrap';
import './Signup.css';
import axios from '../../../http-common';;
import { User } from '../../../interfaces';

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

  const [enteredFirstName, setEnteredFirstName]= useState<string>('');
  const [enteredLastName, setEnteredLastName]= useState<string>('');
  const [enteredUsername, setEnteredUsername] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const optionchanged = (e : React.FormEvent) => {
    var target = e.target as HTMLSelectElement;
    setSelectedRole(+target.value)
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


  const signUpHandler = async (e : React.FormEvent) => {
      e.preventDefault();
      if(!validInput()) return; 

     const user: User = {
      id: 0,
      role: ACC_TYPE[selectedRole].value,
      username: enteredUsername,
      password: enteredPassword,
      firstname: enteredFirstName,
      lastname: enteredLastName,
     }
      axios.post(ACC_TYPE[selectedRole].url, user)
      .then(function (response) {
         alert("Success")
      })
      .catch(function (error) {
          alert(error.response.data.content)
      });
   
    }
  return (
    <div className="signup">
    <Card>
      <CardBody>
      <h1 className='h1' >Sign up</h1>
      <br/>
       <Form onSubmit={signUpHandler}>
       <FormGroup >
          <Label for="firstname">First name</Label>
          <Input id="firstname"  
                value={enteredFirstName}  onChange={event => {
                 setEnteredFirstName(event.target.value)
                }}
             type="text" required/>
       </FormGroup>

        <FormGroup>
          <Label for="lastname">Last name</Label>
          <Input id="lastname"  value={enteredLastName} 
           onChange={event => {setEnteredLastName(event.target.value);} } type="text"  required/>
        </FormGroup>

        <FormGroup >
          <Label for="email" >Email</Label>
          <Input id="email" value={enteredUsername}  onChange={event => {
            
                setEnteredUsername(event.target.value);
              
              }} type="email" required/>
       </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password"  value={enteredPassword}  onChange={event => {
         
                setEnteredPassword(event.target.value);
              
              }} type="password" required/>
        </FormGroup>
       
        <FormGroup >
          <Label for="accountType">Account type</Label>
          <Input id="accountType" onChange={optionchanged} 
                     type="select" required>
                    <option value={0}>{ACC_TYPE[0].name}</option>
                    <option value={1}>{ACC_TYPE[1].name}</option>
          </Input>
       </FormGroup>
       <p id="err" className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    
        <Button className="submitButton"  >Sign up</Button>
        
        <p className='p'>Already have an account? </p>
        <Link to="/">Log in</Link>
        </Form>
       </CardBody>
    </Card>
    </div>
   
  );
};

export default Signup;
