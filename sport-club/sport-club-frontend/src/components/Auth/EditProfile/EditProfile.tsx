import React, { useState, useEffect, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { User } from '../../../interfaces';
import Input from '../../styled/Input';
import Card from '../../styled/Cards/Card';
import GreenButton from '../../styled/Buttons/GreenButton';
import RedButton from '../../styled/Buttons/RedButton';
import Wrapper from '../../styled/Wrappers/Wrapper';
import { findByUsername, updateUser } from '../../../store/features/userSlice';

const EditProfile = () => {
  const [enteredFirstName, setEnteredFirstName]= useState('');
  const [enteredLastName, setEnteredLastName]= useState('');
  const username = useAppSelector((state) => state.user.userTokenState.username)
  const role = useAppSelector((state) => state.user.userTokenState.roles)
  const loggedInUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()
  const navigate=useNavigate();

  const NAMES_REGEX=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

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
 
  const loadUser = () => {
    dispatch(findByUsername(username))
    .unwrap()
    .then((response) => {
       setEnteredFirstName(response.firstname)
       setEnteredLastName(response.lastname)
    })
    .catch((error) => {
        alert(error)
     })

  }

  useEffect(()=>{
        if(loggedInUser.id===0) loadUser() 
        else{
          setEnteredFirstName(loggedInUser.firstname)
          setEnteredLastName(loggedInUser.lastname)
        }

  }, [])
  

  const editHandler = (e: React.FormEvent) => {
     e.preventDefault();
     if(!validInput()) return; 
     const user: User ={
      id: loggedInUser.id,
      role: '',
      username: username, 
      password: '',
      firstname: enteredFirstName,
      lastname: enteredLastName,
    }
    
    dispatch(updateUser(user))
    .unwrap()
    .then(() => {
        alert("Success")
    })
    .catch((error) => {
        alert(error)
     })
    
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
          <Input id="accountType" value={role.substring(5,role.length)} type="text" disabled/>
  
          <GreenButton type='submit' >Update</GreenButton>
        </form>
         <RedButton onClick={() => navigate("/changePassword")}  >Change password</RedButton>
    </Card>
    </Wrapper>
   
  );
};

export default EditProfile;