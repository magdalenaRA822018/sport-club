import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useCallback } from 'react';
import useHttp from '../../../hooks/useHttp';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import   './NewPlayer.css'
import Multiselect from 'multiselect-react-dropdown';
import { Card, CardBody,Label, Input, FormGroup, Form, Button} from 'reactstrap';
import swal from 'sweetalert';


const NewPlayer = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    data,
    sendRequest,
    methodName,
  } = useHttp();
  
  
const addNewPlayer= useCallback( (playerDto) => {
    
    sendRequest(
      'players/new',
      'POST',
      JSON.stringify(playerDto),
      authContext.token,
      'ADD_NEW_PLAYER',
    );
    
}, [sendRequest]);

const loadSkills = useCallback(() => {
    sendRequest(
      'skills/all',
      'GET',
      null,
      authContext.token,
      'SKILLS',
    );

    }, [sendRequest]
);

useEffect(()=>{
    if(data!=null){
       if(methodName==='SKILLS'){
        setShowSkills(true)
        setSkills(data)
       }else if(methodName==='ADD_NEW_PLAYER'){
         if(data.content==="Success"){
          
          swal({ icon: 'success', title: data.content,});
          setEnteredName('')
          setEnteredSalary(0)
          setImage(null)
          setSelectedSkills([])

         }
         else 
         swal({ icon: 'error', title: data.content,});
       }
        
    }
}, [data])



useEffect(()=>{
    loadSkills()
}, [])

  const newPlayerHandler = (event) => {
      event.preventDefault()
      const playerDto = {
        id: 0,
        playerName: enteredName,
        image: image,
        salary: enteredSalary,
        skills: selectedSkills
      }
      
      addNewPlayer(playerDto)
  }

  const imageSelectedHandler=(event)=>{
            const file = event.target.files[0]
            const reader = new FileReader()
            if(file != null){
                 reader.onloadend = () => {
                   setImage(reader.result)
                }
                reader.readAsDataURL(file);
            }
  }
  const onSelect = (skill) => {
     setSelectedSkills(skill)
      
  } 
  const onRemove = (skill) => {
    const index = selectedSkills.indexOf(skill);
    if (index > -1) { 
        selectedSkills.splice(index, 1);
    }
  }
 
    return (
      <div>
       <EditorNavbar></EditorNavbar>
      
        <div className="newPlayer">
        <Card>
          <CardBody>
          <h1 className='h1' >Add new player</h1>
          <br/>
           <Form onSubmit={newPlayerHandler}>
           <FormGroup >
              <Label for="name">Full name</Label>
              <Input id="name"  
                    value={enteredName}  onChange={event => {
                      setEnteredName(event.target.value); 
                    }}
                 type="text" required/>
           </FormGroup>
           <FormGroup >
              <Label for="salary">Salary</Label>
              <Input id="salary"  
                    value={enteredSalary}  onChange={event => {
                      setEnteredSalary(event.target.value); 
                    }}
                 type="number" required/>
           </FormGroup>
           <FormGroup >
              <Label for="image">Image</Label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" required/>
           </FormGroup>

           <FormGroup >
              <Label for="image">Skills</Label>
             
                   {showSkills ? 
                     <Multiselect
                     options={skills} 
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" 
                     required/>
                    :  
                    null }
           
           </FormGroup>
            <Button className="submitButton"  >Submit</Button>
            
           </Form>
           </CardBody>
        </Card>
        </div>
        </div>
      );
  
};

export default NewPlayer;
