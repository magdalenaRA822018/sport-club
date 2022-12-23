import React, { useState, useEffect,useContext ,useCallback} from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/useHttp';
import EditorNavbar from '../EditorNavbar/EditorNavbar';

import Multiselect from 'multiselect-react-dropdown';
import swal from 'sweetalert';
import axios from '../../../http-common'
import { Skill } from '../../../interfaces';
import { Player } from '../../../interfaces';
import Card from '../../styled/Cards/Card';
import Input from '../../styled/Input';
import GreenButton from '../../styled/Buttons/GreenButton';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import ImageWithBorder from '../../styled/Images/ImageWithBorder';
const EditPlayerProfile = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredSalary, setEnteredSalary] = useState<number>(0);

  const [image, setImage] = useState<string>('');
  const [playerSkills, setPlayerSkills] = useState<Skill[]>([]); 

  const [skills, setSkills] = useState([]);  
  const [selectedSkills, setSelectedSkills] = useState<Array<Skill>>([]);
  /*const [showSkills, setShowSkills] = useState(false);
*/
  const {id} = useParams()
  const authContext = useContext(AuthContext);

  const {
    data,
    sendRequest,
    methodName,
  } = useHttp();
  
  
/*const updatePlayer= useCallback( (playerDto) => {
    
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
);*/

    /*useEffect(()=>{
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
    }, [data])*/

  useEffect(()=>{
      if(!id) return;
      axios.post('players/find', {id: id})
      .then(function (response) {
          setEnteredName(response.data.playerName)
          setEnteredSalary(response.data.salary)
          setImage(response.data.image)
          setPlayerSkills(response.data.skills)
      })
      .catch(function (error) {
        alert("error")
      });

      axios.get('skills/all')
      .then(function (response) {
          setSkills(response.data)
      })
      .catch(function (error) {
        alert("error")
      });
  }, [])

  const updatePlayerHandler = (event: React.FormEvent) => {
      event.preventDefault()
      if(!id) return;
      const player: Player = {
        id: +id,
        playerName: enteredName,
        image: image,
        salary: enteredSalary,
        skills: selectedSkills,
        clubName: '',
        clubId: 0,
      }
      
      axios.post('players/update',player)
      .then(function (response) {
         alert("success")
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
  const onSelect = (skills: Array<Skill>) => { setSelectedSkills(skills)} 
  const onRemove = (skills: Array<Skill>) => { setSelectedSkills(skills)}
 
    return (
      <React.Fragment>
       <EditorNavbar></EditorNavbar>
      
        <DashboardWrapper>
        <Card>
          <h1><b>Edit player</b></h1>
          <br/>
           <form onSubmit={updatePlayerHandler}>
       

              <label htmlFor='name' >Full name</label>
              <Input id="name" value={enteredName}  
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                      { setEnteredName(event.target.value)}} 
                 type="text" required/>
          


              <label htmlFor='salary'>Salary</label>
              <Input id="salary"  value={enteredSalary}  
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                      { setEnteredSalary(+event.target.value)}} 
                 type="number" required/>
              

              
      
              <label htmlFor='skills' >Skills</label>
             
                     <Multiselect
                     options={skills} 
                     selectedValues={playerSkills}
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="name" 
                     />
                   <br></br>
              <hr></hr>
                
              <label htmlFor='image' >Upload new image</label>
              <Input id="image"  onChange={imageSelectedHandler} type="file" />
     
              <ImageWithBorder alt="Sample" id='playerImage'  src={image}/>

            <hr></hr>
             
            <GreenButton className="submitButton"  >Submit</GreenButton>
            
            </form>
        </Card>
        </DashboardWrapper>
        </React.Fragment>
      );
  
};

export default EditPlayerProfile;
