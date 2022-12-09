import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../context/auth-context'
import { Link } from 'react-router-dom';
import './Auth.css';

import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';


const Auth = props => {
  const authContext = useContext(AuthContext);
 
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    authContext.login({username: enteredEmail, password: enteredPassword});
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
