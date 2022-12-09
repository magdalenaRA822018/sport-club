import React, { useState, useEffect,useContext ,useCallback} from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/useHttp';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import   './EditPlayerProfile.css'
import Multiselect from 'multiselect-react-dropdown';
import { Card, CardBody,Label, Input, FormGroup, Form, Button} from 'reactstrap';
import swal from 'sweetalert';

const EditPlayerProfile = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');
  const [image, setImage] = useState(null);


  const [playerSkills, setPlayerSkills] = useState(null); //selektovane na pocetku
  const [skills, setSkills] = useState([]);  //ostale
  const [selectedSkills, setSelectedSkills] = useState([]); //stvarne koje saljem na bek
  const [showSkills, setShowSkills] = useState(false);

  const {id} = useParams()
  const authContext = useContext(AuthContext);

  const {
    data,
    sendRequest,
    methodName,
  } = useHttp();
  
  
const updatePlayer= useCallback( (playerDto) => {
    
    sendRequest(
      'players/update',
      'POST',
      JSON.stringify(playerDto),
      authContext.token,
      'UPDATE_PLAYER',
    );
    
}, [sendRequest]);
const loadPlayer= useCallback( () => {
    
    sendRequest(
      'players/find',
      'POST',
      JSON.stringify({id: id}),
      authContext.token,
      'LOAD_PLAYER',
    );
    
}, [sendRequest]);

const loadSkills = useCallback(() => {
    sendRequest(
      'skills/all',
      'GET',
      null,
      authContext.token,
      'SKILLS',
      'SKILLS'
    );

    }, [sendRequest]
);

    useEffect(()=>{
        if(data!=null){
          if(methodName==='SKILLS'){
            setShowSkills(true)
            setSkills(data)
          }else if(methodName==='LOAD_PLAYER'){
            setEnteredName(data.playerName)
            setEnteredSalary(data.salary)
            setPlayerSkills(data.skills)
            setSelectedSkills(data.skills)
          }else if(methodName==='UPDATE_PLAYER'){
            if(data.content==="Success"){
              swal({ icon: 'success', title: data.content,});
            }
            else 
              swal({ icon: 'error', title: data.content,});
          }
            
        }
    }, [data])

  useEffect(()=>{
      loadPlayer()
      loadSkills()
  }, [])

  const updatePlayerHandler = (event) => {
      event.preventDefault()
      if(enteredSalary<0) {
        swal({ icon: 'warning', title: 'Invalid salary input',});
        return;
      }
      const playerDto = {
        id: id,
        playerName: enteredName,
        image: image,
        salary: enteredSalary,
        skills: selectedSkills
      }
      
      updatePlayer(playerDto)
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
  const onSelect = (skill) => { setSelectedSkills(skill)} 
  const onRemove = (skills) => { setSelectedSkills(skills)}
 
    return (
      <div>
       <EditorNavbar></EditorNavbar>
      
        <div className="editPlayer">
        <Card>
          <CardBody>
          <h1 className='h1' >Edit player</h1>
          <br/>
           <Form onSubmit={updatePlayerHandler}>
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
              <Label for="image">Upload new image</Label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" />
           </FormGroup>

           <FormGroup >
              <Label for="image">Skills</Label>
             
                   {showSkills ? 
                     <Multiselect
                     options={skills} 
                     selectedValues={playerSkills}
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" 
                     />
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

export default EditPlayerProfile;
