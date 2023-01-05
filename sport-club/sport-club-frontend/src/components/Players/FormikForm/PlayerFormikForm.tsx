import React, { useState, useEffect } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { NewPlayer, Skill, UpdatePlayer } from '../../../interfaces';
import axios from '../../../http-common';
import GreenButton from '../../styled/Buttons/GreenButton';
import Input from '../../styled/Input';
import ImageWithBorder from '../../styled/Images/ImageWithBorder';
import Multiselect from 'multiselect-react-dropdown';
import Card from '../../styled/Cards/Card';
import {useConvertImage} from '../../../hooks/useConvertImage';
import { Error } from './styled-form/styled-form';
import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { addPlayer, updatePlayer } from '../../../store/features/playerSlice';
import { Navigate } from 'react-router-dom';
interface PlayerProps {
   playerId: string | undefined;
}

interface FormFields {
  playerName: string;
  salary: number;
}

const PlayerFormikForm = (props: PlayerProps) => {
   const [allSkills, setAllSkills]= useState<Array<Skill>>([]);
   const [playerSkills, setPlayerSkills]= useState<Array<Skill>>([]);
   const [skills, setSkills]= useState<Array<Skill>>([]);
   const [formValues, setFormValues] = useState<FormFields>();
   const fileInputRef = useRef<any>(null);
   const [playerImage, extractFileFromEvent, setImage] = useConvertImage()
   const initialValues: FormFields = {
      playerName: '',
      salary: 0,
   }
   const dispatch = useAppDispatch()
   const success = useAppSelector((state) => state.players.success)
   const error = useAppSelector((state) => state.players.error)
   useEffect(()=>{
        if(props.playerId){
              /*  axios.post('players/find', {id: props.playerId})
                .then( response => {
                    setImage(response.data.image)
                    setPlayerSkills(response.data.skills)
                    setSkills(response.data.skills)
                    setFormValues({
                        playerName: response.data.playerName,
                        salary: response.data.salary,
                    })
                })*/
               /* const resultAction = await dispatch(findByUsername(username))
                if (findByUsername.fulfilled.match(resultAction)) {
                  setEnteredFirstName(resultAction.payload.firstname)
                  setEnteredLastName(resultAction.payload.lastname)
                } */
        }
    }, [])

    useEffect(()=>{
      axios.get('skills/all')
      .then( (response)=> {
        setAllSkills(response.data)
      })
    }, [])

    const create = (values: FormFields, actions: any) => {
        const player: NewPlayer = {
          playerName: values.playerName,
          image: playerImage,
          salary: values.salary,
          skills: skills
        }
      /* axios.post('players/new', player)
        .then( response => { 
          alert(response.data)
          actions.resetForm(initialValues)
          setSkills([])
          setImage('')
          if(fileInputRef.current) fileInputRef.current.value=''
        })
        .catch( err =>  alert(err))*/
        
       dispatch(addPlayer(player))
       if(success){
        actions.resetForm(initialValues)
        setSkills([])
        setImage('')
        if(fileInputRef.current) fileInputRef.current.value=''
       }
       
       if(error){
        alert(error)
       }
  }

  const update = (values: FormFields) => {
        if(!props.playerId) return;
        const player: UpdatePlayer = {
          id: +props.playerId,
          playerName: values.playerName,
          image: playerImage,
          salary: values.salary,
          skills: skills,
        }
       /* axios.post('players/update', player)
        .then( response =>  {
          alert(response.data)
          if(fileInputRef.current)  fileInputRef.current.value=''
        })
        .catch( err =>  alert(err))*/
        dispatch(updatePlayer(player))
  }
 
    const onSelect = (selectedSkills: Array<Skill>) => { setSkills(selectedSkills) } 
    const onRemove = (selectedSkills: Array<Skill>) => { setSkills(selectedSkills) }


    const validationSchema= Yup.object({
      playerName: Yup.string().required('Required'),
      salary: Yup.number().required('Required').min(0,'Please enter valid number'),
    })
    return (
 
      <Formik 
        onSubmit = {(values,actions) => {
            if (props.playerId) update(values)
            else create(values,actions)
        }}
        initialValues = {formValues || initialValues}
        validationSchema = {validationSchema}
        enableReinitialize
      >
      {({handleSubmit, values, handleChange, errors, touched}) => (
          <Card>
             <h1><b>{props.playerId ? 'Update player' : 'New player' }</b></h1>
             <Form>
              <label htmlFor='playerName' >Full name</label>
              <Input type="text" value={values.playerName} onChange={handleChange} name="playerName"/>
                  {errors.playerName && touched.playerName ? (  <Error>{errors.playerName}</Error> ) : null}

              <label htmlFor='salary'>Salary</label>
              <Input type="number" value={values.salary} onChange={handleChange} name="salary"/>
                  {errors.salary && touched.salary ? (  <Error>{errors.salary}</Error> ) : null}

              <label htmlFor='image'>Image</label>
              <Input id="image" ref={fileInputRef} onChange={(event: React.ChangeEvent)=>{ extractFileFromEvent(event)}} type="file"/>
              { 
                     playerImage ? 
                      <div>
                          <hr/>
                          <ImageWithBorder alt="Sample" src={playerImage}/>
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
            <GreenButton  type="submit" onClick={() => handleSubmit}  >Submit</GreenButton>
         </Form>
         </Card>
          )}
      </Formik>
    
      );
  
};

export default PlayerFormikForm;
