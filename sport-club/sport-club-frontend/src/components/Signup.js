import React, { useContext } from 'react';

import { AuthContext } from '../context/auth-context';
import './Signup.css';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
const Signup = props => {
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    console.log("uspeo")
  };
  const signUpHandler = () => {
     ///metoda
  };

  return (
    <div className="auth">
    <Card>
      <CardBody>
       <Form onSubmit={signUpHandler}>
       <FormGroup >
          <Label>First name</Label>
          <Input type="text"/>
       </FormGroup>

        <FormGroup>
          <Label>Last name</Label>
          <Input type="text"/>
        </FormGroup>

        <FormGroup >
          <Label>Email</Label>
          <Input type="email"/>
       </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input type="password"/>
        </FormGroup>

        <FormGroup >
          <Label>Account type</Label>
          <Input type="text"/>
       </FormGroup>


        <Button className="submitButton"  color="primary">Sing up</Button>
        
        <p className='p'>Already have an account? </p>
        <a className='p' href='' onClick={loginHandler} >Log in</a>
        </Form>
       </CardBody>
    </Card>
    </div>
   
  );
};

export default Signup;
