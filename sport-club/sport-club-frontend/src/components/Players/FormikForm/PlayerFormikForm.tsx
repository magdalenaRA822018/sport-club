import { Formik, Form, Field, ErrorMessage, isEmptyArray } from 'formik';
import React, { useState, useEffect,useLayoutEffect } from 'react';
import * as Yup from 'yup';
import { NewPlayer, Skill, UpdatePlayer } from '../../../interfaces';
import axios from '../../../http-common';
import GreenButton from '../../styled/Buttons/GreenButton';
import Input from '../../styled/Input';
import ImageWithBorder from '../../styled/Images/ImageWithBorder';
import Multiselect from 'multiselect-react-dropdown';
import Card from '../../styled/Cards/Card';
import { StyledField } from './styled-form/styled-form';
import useUploadImage from '../../../hooks/useUploadImage';
import { useRef } from 'react';
interface PlayerProps {
   playerId: string | undefined;
}

const PlayerFormikForm = (props: PlayerProps) => {
   const [allSkills, setAllSkills]= useState<Array<Skill>>([])
   const [playerSkills, setPlayerSkills]= useState<Array<Skill>>([])
   const [skills, setSkills]= useState<Array<Skill>>([])
   const [formValues, setFormValues] = useState({});
   const [image, setImage] = useState('');
   const uploadImage = useUploadImage(null);
   const imgRef=useRef()
   const initialValues = {
    playerName: '',
    salary: 0,
   }
   
   const validationSchema= Yup.object({
    playerName: Yup.string().required('Required'),
    salary: Yup.number().required('Required').min(0,'Please enter valid number'),
   })

   useEffect(()=>{
        if(props.playerId){
                axios.post('players/find', {id: props.playerId})
                .then(function (response) {
                    setImage(response.data.image)
                    setPlayerSkills(response.data.skills)
                    setFormValues({
                        playerName: response.data.playerName,
                        salary: response.data.salary,
                    })
                })
        }
    }, [])

    useEffect(()=>{
      axios.get('skills/all')
      .then( (response)=> {
        setAllSkills(response.data)
      })
    }, [])

  const create = (values: any, actions: any) => {
        const player: NewPlayer = {
          playerName: values.playerName,
          image: image,
          salary: values.salary,
          skills: skills
        }
        
        axios.post('players/new', player)
        .then( response => { 
          alert(response.data)
          actions.resetForm({ values: initialValues })
          setImage('')
          setSkills([])
        })
        .catch( err =>  alert(err))
  }

  const update = (values: any) => {
        if(!props.playerId) return;
        const player: UpdatePlayer = {
          id: +props.playerId,
          playerName: values.playerName,
          image: image,
          salary: values.salary,
          skills: skills,
        }
        axios.post('players/update', player)
        .then( response =>  {
          alert(response.data)
          
        })
        .catch( err =>  alert(err))
  }
 
  const onSelect = (selectedSkills: Array<Skill>) => { setSkills(selectedSkills) } 
  const onRemove = (selectedSkills: Array<Skill>) => { setSkills(selectedSkills) }

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
  
    return (
 
      <Formik 
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit = { (values, actions) => {
            console.log(actions)
            if (props.playerId){
                update(values)
            }else{
                create(values,actions)
               // actions.resetForm({ values: initialValues })
            }
        }}
      >
      {({ errors, touched, values, handleSubmit }) => (
    <Card>
         <h1><b>{props.playerId ?  'Update player' : 'New player' }</b></h1>
         <Form>
          
              <label htmlFor='playerName' >Full name</label>
              <StyledField id="playerName"   name="playerName"  type="text" />
              <ErrorMessage  name='playerName' /> <br/>
              
              <label htmlFor='salary'>Salary</label>
              <StyledField id="salary" name="salary"  type="number" />
              <ErrorMessage name='salary' /> <br/>

              <label htmlFor='image'>Image</label>
              <Input id="image"  onChange={imageSelectedHandler} type="file"/>
              { 
               image ? 

                    <div>
                        <hr/>
                        <ImageWithBorder alt="Sample" src={image}/>
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
            <GreenButton type="submit"  onClick={() => handleSubmit}    >Submit</GreenButton>
         </Form>
         </Card>
)}
      </Formik>
    
      );
  
};

export default PlayerFormikForm;
