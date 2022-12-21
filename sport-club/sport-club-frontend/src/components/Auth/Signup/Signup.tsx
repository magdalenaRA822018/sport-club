import React, { useState, useEffect,useRef }  from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../http-common';;
import { User } from '../../../interfaces';

import Input from '../../styled/Input';
import Card from '../../styled/Card';
import Button from '../../styled/FormSubmitButton';
import Wrapper from '../../styled/Wrapper';
import InlineParagraph from '../../styled/InlineParagraph';

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
 

  const [enteredFirstName, setEnteredFirstName]= useState<string>('');
  const [enteredLastName, setEnteredLastName]= useState<string>('');
  const [enteredUsername, setEnteredUsername] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const optionchanged = (e : React.FormEvent) => {
    var target = e.target as HTMLSelectElement;
    setSelectedRole(+target.value)
  };
  
  const validInput = () =>{
    if(!NAMES_REGEX.test(enteredFirstName)){
      alert('Invalid first name input') ;
      return false;
    }else if(!NAMES_REGEX.test(enteredLastName)){
      alert('Invalid last name input') ;
      return false;
    }else if(!EMAIL_REGEX.test(enteredUsername)){
      alert('Invalid email input') ;
      return false;
    }else if(!PASSWORD_REGEX.test(enteredPassword)){
      alert('Invalid password input') ;
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
    <Wrapper>
    <Card>
      <h1 >Sign up</h1>
      <br/>
       <form onSubmit={signUpHandler}>
          <label htmlFor='firstname'>First name</label>
          <Input id="firstname" type="text" value={enteredFirstName}  
             onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredFirstName(event.target.value)}}
          required/>
    
          <label htmlFor='lastname'>Last name</label>
          <Input id="lastname"  value={enteredLastName} type="text" 
             onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
              { setEnteredLastName(event.target.value)}}  
          required/>
    
          <label htmlFor='email'  >Email</label>
          <Input id="email" value={enteredUsername} type="email"
          onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredUsername(event.target.value)}}
          required/>
    
          <label htmlFor='passowrd' >Password</label>
          <Input id="password"  value={enteredPassword} type="password" 
           onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredPassword(event.target.value)}}
          required/>
      
          <label htmlFor='accountType' >Account type</label>
          <Input id="accountType" onChange={optionchanged} 
                     type="select" required>
                    <option value={0}>{ACC_TYPE[0].name}</option>
                    <option value={1}>{ACC_TYPE[1].name}</option>
          </Input>
  
        <Button type='submit' >Sign up</Button>
        <InlineParagraph>Already have an account? </InlineParagraph>
        <Link to="/">Log in</Link>
        </form>
    </Card>
    </Wrapper>
   
  );
};

export default Signup;
