import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useCallback } from 'react';
import useHttp from '../../../hooks/useHttp';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import   './NewClubForm.css'
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { Card, CardBody,Label, Input, FormGroup, Form, Button} from 'reactstrap';
const NewClubForm = props => {
  const [enteredName, setEnteredName] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const authContext = useContext(AuthContext);

  const {
    data,
    sendRequest,
    methodName
  } = useHttp();

  const loadPlayers = useCallback(() => {
    sendRequest(
      'players/withoutClub',
      'GET',
      null,
      authContext.token,
      'PLAYERS',
    );

    }, [sendRequest]
);
  const addNewClub= useCallback( (clubDto) => {
    sendRequest(
      'sportclubs/new',
      'POST',
      JSON.stringify(clubDto),
      authContext.token,
      'ADD_NEW_CLUB',
    );
    
}, [sendRequest]);

const onSelect = (player)=>{
  setSelectedPlayers(player)
}
const onRemove = (player)=>{
  const index = selectedPlayers.indexOf(player);
    if (index > -1) { 
        selectedPlayers.splice(index, 1);
    }
}
useEffect(()=>{
  loadPlayers()
}, [])

useEffect(()=>{
  if(data!=null){
     if(methodName==='PLAYERS'){
      setShowPlayers(true)
      setPlayers(data)
     }else if(methodName==='ADD_NEW_CLUB'){
       if(data.content==="Success"){
        swal({ icon: 'success', title: data.content,});
        setEnteredName('')
        setSelectedPlayers([])
       }
       else 
       swal({ icon: 'error', title: data.content,});
     }
      
  }
}, [data])

  const newClubHandler = (event) => {
      event.preventDefault()
      const clubDto={
        name: enteredName,
        players: selectedPlayers,
      }
      addNewClub(clubDto)
  }
 
    return (
      <div>
         <EditorNavbar></EditorNavbar>
        <div className="newClub">
        <Card>
          <CardBody>
          <h1 className='h1' >Add new club</h1>
          <br/>
           <Form onSubmit={newClubHandler}>
           <FormGroup >
              <Label for="name">Name</Label>
              <Input id="name"  
                    value={enteredName}  onChange={event => {
                      setEnteredName(event.target.value); 
                    }}
                 type="text" required/>
           </FormGroup>
           <FormGroup >
              <Label for="players">Players</Label>
             
                   {showPlayers ? 
                     <Multiselect
                     options={players} 
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="playerName" 
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

export default NewClubForm;
