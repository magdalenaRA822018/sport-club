import React, { useRef, useEffect, useState  } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from '../api/axios';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';

const Auth = props => {


  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const errRef = useRef();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  
 
  useEffect(() => {
    setErrMsg('');
  }, [enteredEmail, enteredPassword])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/auth/login",
            JSON.stringify({username: enteredEmail, password: enteredPassword}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response.data));

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ enteredEmail, enteredPassword, roles, accessToken });
 
        setEnteredEmail('');
        setEnteredPassword('');

        if(roles==="ROLE_EDITOR")
         navigate("/editor/home", { replace: true });
        else if(roles==="ROLE_VIEWER")
        navigate("/viewer/home", { replace: true });


    } catch (err) {
        if (!err.response) {
          setErrMsg('No Server Response');
        } else if (err.response.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
    }
}

 
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

        <p ref={errRef} id="err" className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
       
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
