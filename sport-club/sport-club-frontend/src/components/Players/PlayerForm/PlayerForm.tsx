import React, { useState, useEffect,useLayoutEffect } from 'react';
import axios from '../../../http-common';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../interfaces';
import { Skill } from '../../../interfaces';
import Multiselect from 'multiselect-react-dropdown';
import Input from '../../styled/Input';
import { useFormik } from 'formik';
import Card from '../../styled/Cards/Card';
import GreenButton from '../../styled/Buttons/GreenButton';
import ImageWithBorder from '../../styled/Images/ImageWithBorder';
export interface PlayerProps {
   playerId?: string | undefined;
   isCreateMode: boolean;
}

const PlayerForm = (props: PlayerProps) => {

  const [enteredName, setEnteredName] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');
  const [image, setImage] = useState('');
  const [playerSkills, setPlayerSkills] = useState<Array<Skill>>([]);
  const [id, setId] = useState<number|null>(null);
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [allSkills, setAllSkills] = useState([]);
  const navigate=useNavigate();
  const [player, setPlayer] = useState({} as Player)
  useEffect(()=>{
        if(props.playerId!==undefined){
                setId(+props.playerId)
                axios.post('players/find', {id: props.playerId})
                .then(function (response) {
                    setEnteredName(response.data.playerName)
                    setEnteredSalary(response.data.salary)
                    setImage(response.data.image)
                    setPlayerSkills(response.data.skills)
                    setPlayer(response.data)
                    console.log("naziv"+response.data)
                    console.log(player)
                })
        }
        axios.get('skills/all')
        .then( (response)=> {
          setAllSkills(response.data)
         
        })
}, [])

  const submitPlayerHandler = (event: React.FormEvent) => {
      event.preventDefault()
      const player: Player = {
        id: 0,
        playerName: enteredName,
        image: image,
        salary: +enteredSalary,
        skills: skills,
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
   const formik = useFormik({

     initialValues: {
        id: 0,
        playerName: '',
        image: '',
        salary: 0,
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
      
       axios.post('players/new',{...values, skills, image})
              .then( (response) =>{
                navigate(-1)
              })
              .catch( (error) =>{
                alert("error")
      });
       
     },
   });
  const onSelect = (selectedSkills: Array<Skill>) => { console.log("skill selected"); setSkills(selectedSkills) } 
  const onRemove = (selectedSkills: Array<Skill>) => { setSkills(selectedSkills) }
 
    return (
 
        <Card>

           <h1>{props.isCreateMode ? 'Add player' : 'Update player'}</h1>
           <h1><b>Player form</b></h1>
           <form onSubmit={formik.handleSubmit}>
      
              <label htmlFor='name' >Full name</label>
              <Input id="playerName"   name="playerName"  type="text" 
                    onChange={formik.handleChange}
                    value={formik.values.playerName}
              required/>
        
              <label htmlFor='salary'>Salary</label>
              <Input id="salary" name="salary"  type="number" 
                   onChange={formik.handleChange}
                   value={formik.values.salary}
               required/>
   
              <label htmlFor='image'>Image</label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" required/>
           

              <hr></hr>
                
              <label htmlFor='image' >Upload new image</label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" />
     
              {  props.isCreateMode? 
                    <div>
                        <hr/>
                        <ImageWithBorder alt="Sample" id='playerImage'  src={image}/>
                        <hr/>
                    </div>
                    : null
              }
             <label htmlFor='skills'>Skills</label>
                     <Multiselect
                     id="skills"
                     options={allSkills} 
                     selectedValues={playerSkills}
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" />
            <br></br>
            <GreenButton type="submit"  >Submit</GreenButton>
            
           </form>
          
        </Card>
    
      );
  
};

export default PlayerForm;
