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
import useUploadImage from '../../../hooks/useUploadImage';
import { Error } from './styled-form/styled-form';
import { useRef } from 'react';
interface PlayerProps {
   playerId: string | undefined;
}
interface FormFields {
  playerName: string;
  salary: string;
}

const PlayerFormikForm = (props: PlayerProps) => {
   const [allSkills, setAllSkills]= useState<Array<Skill>>([]);
   const [playerSkills, setPlayerSkills]= useState<Array<Skill>>([]);
   const [skills, setSkills]= useState<Array<Skill>>([]);
   const [formValues, setFormValues] = useState<FormFields>();
   const [image, setImage] = useState('');
   
   const imgRef = useRef<any>(null);
   const multiselectRef = useRef<any>(null);


   const initialValues = {
    playerName: '',
    salary: 0,
   }
   
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
          actions.resetForm(initialValues)
          setImage('')
          setSkills([])
          console.log(imgRef)
          if(imgRef.current) imgRef.current.value=''
          if(multiselectRef.current) multiselectRef.current.resetSelectedValues(['1'])
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
          if(imgRef.current) imgRef.current.value=''
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
 const validationSchema= Yup.object({
  playerName: Yup.string().required('Required'),
  salary: Yup.number().required('Required').min(0,'Please enter valid number'),
 })
    return (
 
      <Formik 
        initialValues={formValues ||  initialValues }
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit = { (values, actions) => {
            if (props.playerId) update(values)
            else create(values,actions)
        }}
      >
      {({handleSubmit, values, handleChange, errors, touched} ) => (
          <Card>
             <h1><b>{props.playerId ?  'Update player' : 'New player' }</b></h1>
             <form  >
          
              <label htmlFor='playerName' >Full name</label>
              <Input type="text" value={values.playerName} onChange={handleChange} name="playerName"/>
                  {errors.playerName && touched.playerName ? (  <Error>{errors.playerName}</Error> ) : null}
              <label htmlFor='salary'>Salary</label>
              <Input type="number" value={values.salary} onChange={handleChange} name="salary"/>
                  {errors.salary && touched.salary ? (  <Error>{errors.salary}</Error> ) : null}
            

              <label htmlFor='image'>Image</label>
              <Input id="image" ref={imgRef} onChange={imageSelectedHandler} type="file"/>
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
            <GreenButton onClick={() => handleSubmit} type="submit">Submit</GreenButton>
         </form>
         </Card>
)}
      </Formik>
    
      );
  
};

export default PlayerFormikForm;
