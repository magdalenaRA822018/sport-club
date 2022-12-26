import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth-context'
import { Link, Navigate } from 'react-router-dom';
import axios from '../../../http-common';
import { Credentials, UserTokenState } from '../../../interfaces';
import Input from '../../styled/Input';
import Card from '../../styled/Cards/Card';
//import Button from '../../styled/Buttons/Button';
import Wrapper from '../../styled/Wrappers/Wrapper';
import InlineParagraph from '../../styled/Wrappers/InlineWrapper';
import { SubmitFormButton } from '../../styled/Buttons/SubmitFormButton';
import Button from '../../styled/Buttons/Button';
import { useNavigate } from 'react-router-dom';
const Auth: FC = () => {
  const authContext = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [valid, setValid] = useState(true);
  const light=false;
  const navigate=useNavigate()
  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const user: Credentials = {
      username: enteredEmail,
      password: enteredPassword,
     }

    axios.post('auth/login', user)
    .then( (response)=> {
      const tokenState: UserTokenState = {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        username: response.data.username,
        roles: response.data.roles
      }
      authContext?.login(tokenState)
     
      
      
    })
    .catch( (error) =>{
      alert("error")
    });
  };


  

 
  return (
 
    <Wrapper>

    <Card>
      
      <h1 className='h1' >Log in</h1>
      <br/>
          <form onSubmit={loginHandler}>
          <label htmlFor='email'>Email</label>
          <Input id="email" type="email" value={enteredEmail}
           onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredEmail(event.target.value)}}
          required/>
      
          
          <label  htmlFor='password' >Password</label>
          <Input id="password" type="password" value={enteredPassword}
           onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
            { setEnteredPassword(event.target.value)}}
          required/>
        <Button  type="submit">Login</Button>
        </form>
        <InlineParagraph>Don't have an account? </InlineParagraph>
        <Link to="/signup">Sign Up</Link>
    <SubmitFormButton valid={valid} >a</SubmitFormButton>
    
   
    </Card>
    </Wrapper>
  
  );
};

export default Auth;
