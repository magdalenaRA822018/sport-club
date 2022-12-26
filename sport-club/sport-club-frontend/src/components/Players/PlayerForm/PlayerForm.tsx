import React, { useState, useEffect,useLayoutEffect } from 'react';
import axios from '../../../http-common';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../interfaces';
import { Skill } from '../../../interfaces';
import Multiselect from 'multiselect-react-dropdown';
import Input from '../../styled/Input';

import Card from '../../styled/Cards/Card';
import GreenButton from '../../styled/Buttons/GreenButton';
export interface PlayerProps {
   playerId?: string | undefined;
}

const PlayerForm = (props: PlayerProps) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');
  const [image, setImage] = useState('');
  const [playerSkills, setPlayerSkills] = useState<Array<Skill>>([]);
  const [id, setId] = useState<number|null>(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState<Array<Skill>>([]);
  const navigate=useNavigate();

  useEffect(()=>{
        if(props.playerId!==undefined){
                setId(+props.playerId)
                axios.post('players/find', {id: props.playerId})
                .then(function (response) {
                    setEnteredName(response.data.playerName)
                    setEnteredSalary(response.data.salary)
                    setImage(response.data.image)
                    setPlayerSkills(response.data.skills)
                    console.log(response.data)
                })
        }
        axios.get('skills/all')
        .then( (response)=> {
          setSkills(response.data)
         
        })
}, [])

  const submitPlayerHandler = (event: React.FormEvent) => {
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
              .then( (response) =>{
                navigate(-1)
              })
              .catch( (error) =>{
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
 
        <Card>
          <h1><b>Player form</b></h1>

           <form onSubmit={submitPlayerHandler}>
      
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
                     selectedValues={playerSkills}
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" 
               />
            <br></br>
            <GreenButton type="submit"  >Submit</GreenButton>
            
           </form>
          
        </Card>
    
      );
  
};

export default PlayerForm;
