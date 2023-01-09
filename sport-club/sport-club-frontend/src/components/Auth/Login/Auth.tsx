import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Credentials } from '../../../interfaces';
import Input from '../../styled/Input';
import Card from '../../styled/Cards/Card';
import Wrapper from '../../styled/Wrappers/Wrapper';
import InlineParagraph from '../../styled/Wrappers/InlineWrapper';
import { SubmitFormButton } from '../../styled/Buttons/SubmitFormButton';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { login } from '../../../store/features/userSlice';
import Button from '../../styled/Buttons/Button';
const Auth: FC = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const navigate=useNavigate()
  const userTokenState = useAppSelector((state) => state.user.userTokenState)
  const dispatch = useAppDispatch()

  const EMAIL_REGEX= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 
  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const user: Credentials = {
      username: enteredEmail,
      password: enteredPassword,
     }

    dispatch(login(user))
    .unwrap()
    .then(() => {
        if(userTokenState.roles=='ROLE_EDITOR')  navigate('/editor/sportclubs')
        else if(userTokenState.roles=='ROLE_VIEWER')  navigate('/viewer/sportclubs')
    })
    .catch((error) => {
        alert(error)
    })
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
            {setEnteredPassword(event.target.value) 
            }}
          required/>
        <SubmitFormButton valid={EMAIL_REGEX.test(enteredEmail) && enteredPassword!==''} type="submit">Login</SubmitFormButton>
        </form>
        <InlineParagraph>Don't have an account? </InlineParagraph>
        <Link to="/signup">Sign Up</Link>
    </Card>
    <Button onClick={() => navigate("/frontend")}  >Front</Button>
    </Wrapper>
  );
};

export default Auth;
