import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/auth-context'
import { Link } from 'react-router-dom';
import './Auth.css';
import axios from "axios";
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';

import { UserTokenState } from '../../../interfaces';

const Auth = () => {
  const authContext = useContext(AuthContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [user,setUser]=useState< UserTokenState | null>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
   // authContext.login({username: enteredEmail, password: enteredPassword});

    axios.post('http://localhost:8081/auth/login',  {username: enteredEmail, password: enteredPassword})
    .then(function (response) {
      
      setUser({
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        username: response.data.username,
        roles: response.data.roles
      })
      console.log(user?.username)
      if(authContext!=null && user!=null)
         authContext.login(user)
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  

 
  return (
    <div className="auth">
    <Card>
      <CardBody>
      <h1 className='h1' >Log in</h1>
      <br/>
       <Form onSubmit={handleSubmit}>
        <FormGroup >
          <Label for="email">Email</Label>
          <Input id="email"
              value={enteredEmail}  onChange={event => {
                setEnteredEmail(event.target.value);
              }} type="email" required/>
       </FormGroup>

        <FormGroup>
          <Label  for="password" >Password</Label>
          <Input id="password"
              value={enteredPassword}  onChange={event => {
                setEnteredPassword(event.target.value);
              }} type="password" required/>
        </FormGroup>
        <Button className="submitButton">Login</Button>
        
        <p  className='p'>Don't have an account? </p>
        <Link to="/signup">Sign Up</Link>
        </Form>
       </CardBody>
    </Card>
    
   </div>
  );
};

export default Auth;
