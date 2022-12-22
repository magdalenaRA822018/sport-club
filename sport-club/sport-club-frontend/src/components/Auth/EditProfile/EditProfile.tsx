import React, { useState, useEffect, useContext }  from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import axios from '../../../http-common';
import { User } from '../../../interfaces';
import Input from '../../styled/Input';
import Card from '../../styled/Card';
import GreenButton from '../../styled/GreenButton';
import RedButton from '../../styled/RedButton';
import Wrapper from '../../styled/Wrapper';
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
    <Wrapper>
    <Card>
      <h1>Edit profile info</h1>
      <br/>
       <form onSubmit={editHandler}>

          <label htmlFor='firstname'>First name</label>
          <Input id="firstname"  type="text" value={enteredFirstName} 
                onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                  { setEnteredFirstName(event.target.value)}}
              required/>
   
    
          <label htmlFor='lastname' >Last name</label>
          <Input id="lastname"  value={enteredLastName} type="text"
            onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
              { setEnteredLastName(event.target.value)}}
              required/>
 

          <label htmlFor='email' >Email</label>
          <Input id="email" value={username}  type="email" disabled/>
     

       
      
          <label htmlFor='accountType' >Account type</label>
          <Input id="accountType" value={accountType.substring(5,accountType.length)} type="text" disabled/>
  
          <GreenButton type='submit' >Update</GreenButton>
        </form>
         <RedButton onClick={() => navigate("/changePassword")}  >Change password</RedButton>
    </Card>
    </Wrapper>
   
  );
};

export default EditProfile;