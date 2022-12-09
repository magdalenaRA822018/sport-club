import React, { useState,  useCallback, useEffect, useRef }  from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import swal from 'sweetalert';
import useHttp from '../../../hooks/useHttp';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
const Signup = props => {

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

  const optionchanged = (e) => {
    console.log(e.target.value)
    setSelected(e.target.value);
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
  const signUp= useCallback( (signupDto,url) => {
      sendRequest(
        url,
        'POST',
        JSON.stringify(signupDto),
        null,
        'SIGNUP'
      );
      
  }, [sendRequest]);

  useEffect(()=>{
      if(data!=null){
        if(data.content==="Success")
           swal({ icon: 'success', title: "Success",});
        else 
           swal({ icon: 'error', title: "Error",});
      }
  }, [data])

 

  const signUpHandler = (e) => {
      e.preventDefault();
     if(!validInput()) return; 

     const signupDto = {
      username: enteredUsername,
      password: enteredPassword,
      firstname: enteredFirstName,
      lastname: enteredLastName,
      role: ACC_TYPE[selected].value
     }
     signUp(signupDto,ACC_TYPE[selected].url)
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
                  setErrMsg('')
                  setEnteredFirstName(event.target.value); 
                }}
             type="text" required/>
       </FormGroup>

        <FormGroup>
          <Label for="lastname">Last name</Label>
          <Input id="lastname"  value={enteredLastName}  onChange={event => {
                setErrMsg('')
                setEnteredLastName(event.target.value);
              }} type="text"  required/>
        </FormGroup>

        <FormGroup >
          <Label for="email" >Email</Label>
          <Input id="email" value={enteredUsername}  onChange={event => {
                setErrMsg('')
                setEnteredUsername(event.target.value);
              }} type="email" required/>
       </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password"  value={enteredPassword}  onChange={event => {
                setErrMsg('')
                setEnteredPassword(event.target.value);
              }} type="password" required/>
        </FormGroup>
       
        <FormGroup >
          <Label for="accountType">Account type</Label>
          <Input id="accountType" onChange={optionchanged}  type="select" required>
                    <option value={0}>{ACC_TYPE[0].name}</option>
                    <option value={1}>{ACC_TYPE[1].name}</option>
          </Input>
       </FormGroup>
       
    
       <p ref={errRef} id="err" className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

       
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
