import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
import './EditProfile.css';
import axios from '../../../http-common';
import { User } from '../../../interfaces';

const EditProfile = () => {

  const NAMES_REGEX=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const [enteredFirstName, setEnteredFirstName]= useState<string>('');
  const [enteredLastName, setEnteredLastName]= useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('');
  const authContext: any=useContext(AuthContext)
  const navigate=useNavigate();


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
  

 
  const loadUser = (username:string) => {
    axios.post('users/username', {username: username})
    .then(function (response) {
        setEnteredFirstName(response.data.firstname)
        setEnteredLastName(response.data.lastname)
        setUsername(response.data.username)
        setAccountType(response.data.role)
    })
    .catch(function (error) {
      alert("error")
    });
  
  }


  useEffect(()=>{
    loadUser(authContext.username)
  }, [])
  

  const editHandler = (e: React.FormEvent) => {
     e.preventDefault();
     if(!validInput()) return; 

     const user: User ={
      id: 0,
      role: '',
      username: username,
      password: '',
      firstname: enteredFirstName,
      lastname: enteredLastName,
    }
    axios.post('users/update', user )
    .then(function (response) {
      alert(response.data.content)
    })
    .catch(function (error) {
      alert("error")
    });

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
          <Input id="text" value={accountType.substring(5,accountType.length)} type="text" disabled/>
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