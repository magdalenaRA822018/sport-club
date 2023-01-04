import React, { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth-context'
import { Link } from 'react-router-dom';
import axios from '../../../http-common';
import { Credentials, UserTokenState } from '../../../interfaces';
import Input from '../../styled/Input';
import Card from '../../styled/Cards/Card';
import Wrapper from '../../styled/Wrappers/Wrapper';
import InlineParagraph from '../../styled/Wrappers/InlineWrapper';
import { SubmitFormButton } from '../../styled/Buttons/SubmitFormButton';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/features/userSlice';
import { useAppSelector, useAppDispatch } from '../../../store/store';

const Auth: FC = () => {
  const authContext = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate=useNavigate()
  const EMAIL_REGEX= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const count = useAppSelector((state) => state.user.username)
  const dispatch = useAppDispatch()
  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const user: Credentials = {
      username: enteredEmail,
      password: enteredPassword,
     }
     dispatch(login(user))

    /*axios.post('auth/login', user)
    .then( response => {
      const tokenState: UserTokenState = {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        username: response.data.username,
        roles: response.data.roles
      }
      authContext?.login(tokenState)
     

     if(tokenState.roles=='ROLE_EDITOR')  navigate('/editor/sportclubs')
     else if(tokenState.roles=='ROLE_VIEWER')  navigate('/viewer/sportclubs')
      
      
    })
    .catch( error =>{
      alert("error")
    });
    */

  };

  useEffect(()=>{

   console.log("redux user "+count)
   
  },[])
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
            {setEnteredPassword(event.target.value) 
            }}
          required/>
        <SubmitFormButton valid={EMAIL_REGEX.test(enteredEmail) && enteredPassword!==''} type="submit">Login</SubmitFormButton>
        </form>
        <InlineParagraph>Don't have an account? </InlineParagraph>
        <Link to="/signup">Sign Up</Link>
    
   
    </Card>
    </Wrapper>
  
  );
};

export default Auth;
