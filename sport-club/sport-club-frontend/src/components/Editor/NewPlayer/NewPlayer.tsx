import React, { useState, useEffect } from 'react';
import axios from '../../../http-common';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../interfaces';
import { Skill } from '../../../interfaces';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import Multiselect from 'multiselect-react-dropdown';
import Input from '../../styled/Input';
import swal from 'sweetalert';
import Card from '../../styled/Card';
import DashboardWrapper from '../../styled/DashboardWrapper';
import GreenButton from '../../styled/GreenButton';
const NewPlayer = () => {
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredSalary, setEnteredSalary] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState<Array<Skill>>([]);

  const navigate=useNavigate();


useEffect(()=>{
        axios.get('skills/all')
        .then(function (response) {
          setSkills(response.data)
         
        })
}, [])

  const newPlayerHandler = (event: React.FormEvent) => {
      event.preventDefault()
      const player: Player = {
        id: 0,
        playerName: enteredName,
        image: image,
        salary: +enteredSalary,
        skills: selectedSkills,
        clubName: '',
        clubId: 0,
      }

      axios.post('players/new',player)
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
        alert("error")
      });
    
  }

  const imageSelectedHandler=(event: React.ChangeEvent)=>{
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader()
        if(file){
               reader.onloadend = () => {
                 if(reader.result)
                  setImage(reader.result.toString())
               }
               reader.readAsDataURL(file);
        }
 }
  
 
  const onSelect = (selectedSkills: Array<Skill>) => { setSelectedSkills(selectedSkills) } 
  const onRemove = (selectedSkills: Array<Skill>) => { setSelectedSkills(selectedSkills) }
 
    return (
      <React.Fragment>
       <EditorNavbar></EditorNavbar>
      <DashboardWrapper>
        <Card>
          <h1><b>Add new player</b></h1>

           <form onSubmit={newPlayerHandler}>
      
              <label htmlFor='name' >Full name</label>
              <Input id="name"  value={enteredName}  type="text" 
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                      { setEnteredName(event.target.value)}}
              required/>
        
              <label htmlFor='salary'>Salary</label>
              <Input id="salary"  value={enteredSalary} type="number" 
                   onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                    { setEnteredSalary(event.target.value)}} 
               required/>
   
              <label htmlFor='image'>Image</label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" required/>
           

              <label htmlFor='skills'>Skills</label>
                     <Multiselect
                     id="skills"
                     options={skills} 
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" 
               />
            <br></br>
            <GreenButton type="submit"  >Submit</GreenButton>
            
           </form>
          
        </Card>
        </DashboardWrapper>
        </React.Fragment>
        
      );
  
};

export default NewPlayer;
