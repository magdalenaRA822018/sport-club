import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth-context'
import { Link } from 'react-router-dom';
import axios from '../../../http-common';
import { Credentials, UserTokenState } from '../../../interfaces';
import './Auth.css';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
import MyCard from '../../styled/Card';
const Auth: FC = () => {
  const authContext = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredPassword, setEnteredPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user: Credentials = {
      username: enteredEmail,
      password: enteredPassword,
     }

    axios.post('auth/login', user)
    .then(function (response) {
      const tokenState: UserTokenState = {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        username: response.data.username,
        roles: response.data.roles
      }
      authContext?.login(tokenState)
    })
    .catch(function (error) {
      alert("error")
    });
  };
  

 
  return (
    <div className="auth">
      <MyCard></MyCard>
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
