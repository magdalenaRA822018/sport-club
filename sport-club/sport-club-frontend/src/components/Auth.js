import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../context/auth-context';
import './Auth.css';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
const Auth = props => {
  const authContext = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const loginHandler = event => {
    event.preventDefault();
    authContext.login({username: enteredEmail, password: enteredPassword});
  };
  
  const signUpHandler = () => {
     console.log("uspeo")
  };
 
  return (
    <div className="auth">
    <Card>
      <CardBody>
       <Form onSubmit={loginHandler}>
        <FormGroup >
          <Label>Email</Label>
          <Input id="email"
              value={enteredEmail}  onChange={event => {
                setEnteredEmail(event.target.value);
              }} type="email"/>
       </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input id="password"
              value={enteredPassword}  onChange={event => {
                setEnteredPassword(event.target.value);
              }} type="password"/>
        </FormGroup>

        <Button className="submitButton"  color="primary">Login</Button>
        
        <p className='p'>Don't have an account? </p>
        <a className='p' href='' onClick={signUpHandler} >Sign up</a>
        </Form>
       </CardBody>
    </Card>
    
   </div>
  );
};

export default Auth;
