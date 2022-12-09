import React, { useState,  useCallback, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import useHttp from '../../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
import './EditProfile.css';

const EditProfile = props => {

  const NAMES_REGEX=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const [enteredFirstName, setEnteredFirstName]= useState('');
  const [enteredLastName, setEnteredLastName]= useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const authContext=useContext(AuthContext)
  const navigate=useNavigate();
  const {
    data,
    sendRequest,
    methodName
  } = useHttp();

  const validInput = () =>{
    if(!NAMES_REGEX.test(enteredFirstName)){
      swal({ icon: 'warning', title: 'Invalid first name input',});
      return false;
    }else if(!NAMES_REGEX.test(enteredLastName)){
      swal({ icon: 'warning', title: 'Invalid last name input',});
      return false;
    }
      return true;
  }
  
  const save = useCallback((userDto) => {
    sendRequest(
      'users/update',
      'POST',
      JSON.stringify(userDto),
      authContext.token,
      'SAVE'
    );

    }, [sendRequest]

  );
 
  const loadUser = useCallback(() => {
    sendRequest(
      'users/username',
      'POST',
      JSON.stringify({username: authContext.username}),
      authContext.token,
      'LOADUSERS'
    );

    }, [sendRequest]

  );

  useEffect(()=>{
    loadUser()
  }, [])
  
  useEffect(()=>{
    if(data!=null){
       if(methodName==='LOADUSERS'){
        setEnteredFirstName(data.firstname)
        setEnteredLastName(data.lastname)
        setUsername(data.username)
        setAccountType(data.role)
       }else if(methodName==='SAVE'){
         if(data.content==="Success"){
          swal({ icon: 'success', title: data.content,});
         }
         else 
         swal({ icon: 'error', title: data.content,});
       }
        
    }
  }, [data])

  const editHandler = (e) => {
      e.preventDefault();
     if(!validInput()) return; 

     const userDto = {
      username: username,
      password: '',
      firstname: enteredFirstName,
      lastname: enteredLastName,
      role: ''
     }
     save(userDto)
    }

  return (
    <div className="editProfile">
    <Card>
      <CardBody>
      <h1 className='h1' >Edit profile info</h1>
      <br/>
       <Form onSubmit={editHandler}>
       <FormGroup >
          <Label for="firstname">First name</Label>
          <Input id="firstname"  
                value={enteredFirstName}  onChange={event => {
                  setEnteredFirstName(event.target.value); 
                }}
             type="text" required/>
       </FormGroup>

        <FormGroup>
          <Label for="lastname">Last name</Label>
          <Input id="lastname"  value={enteredLastName}  onChange={event => {
                setEnteredLastName(event.target.value);
              }} type="text"  required/>
        </FormGroup>

        <FormGroup >
          <Label for="email" >Email</Label>
          <Input id="email" value={username}  type="email" disabled/>
       </FormGroup>

       
        <FormGroup >
          <Label for="accountType">Account type</Label>
          <Input id="text" value={accountType} type="text" disabled/>
       </FormGroup>
       
  
        <Button className="submitButton"  >Update</Button>
        </Form>
        <Button onClick={() => navigate("/changePassword")}  className="changePasswordButton"  >Change password</Button>
       </CardBody>
    </Card>
    </div>
   
  );
};

export default EditProfile;
