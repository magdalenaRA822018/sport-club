import React, {useContext, useEffect, useState, useCallback} from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import useHttp from '../../../hooks/useHttp';
import swal from 'sweetalert';
import { Card,CardBody,Form,FormGroup,Label,Input,Button,Table } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import './EditClubProfile.css'

const EditClubProfile = props => {
    const [enteredName, setEnteredName] = useState('');

    const [playersWithoutClub, setPlayersWithoutClub] = useState([]); //igraci koji nemaju klubove za bind u select
    const [clubPlayers, setClubPlayers] = useState([]); //igraci koji su vec u klubu bind u selectED
    const [selectedPlayers, setSelectedPlayers]=useState([]);

    const [showPlayers, setShowPlayers] = useState(false);
    const [showClubPlayers, setShowClubPlayers] = useState(false);
    const authContext = useContext(AuthContext);
    const {id}=useParams()
    const {
      data,
      sendRequest,
      methodName
    } = useHttp();

    const loadSportClub = useCallback(() => {
      sendRequest(
        'sportclubs/club',
        'POST',
        JSON.stringify({id: id }),
        authContext.token,
        'LOAD_CLUB',
      );
  
      }, [sendRequest]
  );

  const loadPlayers = useCallback(() => {
    sendRequest(
      'players/withoutClub',
      'GET',
      null,
      authContext.token,
      'LOAD_PLAYERS',
    );

    }, [sendRequest]
);
    const update= useCallback( (clubDto) => {
      sendRequest(
        'sportclubs/update',
        'POST',
        JSON.stringify(clubDto),
        authContext.token,
        'UPDATE_CLUB',
      );
      
  }, [sendRequest]);

  const addPlayersToClub= useCallback( (clubPlayersDto) => {
    sendRequest(
      'players/addToClub',
      'POST',
      JSON.stringify(clubPlayersDto),
      authContext.token,
      'ADD_PLAYERS_TO_CLUB',
      'ADD_PLAYERS_TO_CLUB',
    );
    
}, [sendRequest]);

const removeFromClub= useCallback( (playerId) => {
  sendRequest(
    'players/removeFromClub',
    'POST',
    JSON.stringify({playerId: playerId}),
    authContext.token,
    'REMOVE_FROM_CLUB',
    'REMOVE_FROM_CLUB',
  );
  
}, [sendRequest]);

const updateClubName= useCallback( (sportClubDto) => {
  sendRequest(
    'sportclubs/update',
    'POST',
    JSON.stringify(sportClubDto),
    authContext.token,
    'UPDATE_CLUB_NAME',
  );
  
}, [sendRequest]);

  useEffect(()=>{
    if(data!=null){
       if(methodName==='LOAD_PLAYERS'){
        setPlayersWithoutClub(data)
        setShowPlayers(true)
       }else if(methodName==='LOAD_CLUB'){
       
        setEnteredName(data.name)
        setClubPlayers(data.players)
        setSelectedPlayers(data.players)
        setShowClubPlayers(true)
       }else if(methodName==='UPDATE_CLUB'){
        if(data.content==="Success"){
          swal({ icon: 'success', title: data.content,});
         }
         else {
          swal({ icon: 'error', title: data.content,});
         }
       }else if(methodName==='ADD_PLAYERS_TO_CLUB'){
        if(data.content==="Success"){
          setClubPlayers([])
          setShowPlayers(false)
          setShowClubPlayers(false)
          setPlayersWithoutClub([])
          setSelectedPlayers([])
          loadSportClub()
          loadPlayers()
          swal({ icon: 'success', title: data.content,});
         }
         else {
          swal({ icon: 'error', title: data.content,});
          }
        
       }else if(methodName==='REMOVE_FROM_CLUB'){
        if(data.content==="Success"){
          setClubPlayers([])
          setShowPlayers(false)
          setShowClubPlayers(false)
          setPlayersWithoutClub([])
          setSelectedPlayers([])
          loadSportClub()
          loadPlayers()
          swal({ icon: 'success', title: data.content,});
         }
         else {
          swal({ icon: 'error', title: data.content,});
          }
       }else if(methodName==='UPDATE_CLUB_NAME'){
         if(data.content==="Success"){
          swal({ icon: 'success', title: data.content,});
         }
         else {
          swal({ icon: 'error', title: data.content,});
         }
       }
        
    }
  }, [data])
  
  
  



 
 const updateClubNameHandler = (event)=>{
   if(enteredName==="") return;
   const clubDto ={
    id: id,
    name: enteredName,
    players: null
   }
   updateClubName(clubDto)
 }

const addPlayersToClubHandler = ()=>{
  if(selectedPlayers.length>0){
    const clubPlayersDto = {clubId: id, players: selectedPlayers}
    addPlayersToClub(clubPlayersDto)
  }
}
const removeFromClubHandler = (playerId) => {
  removeFromClub(playerId)
}
 
 
 useEffect(()=>{
  loadSportClub()
  loadPlayers()
}, [])
    


const onSelect = (players) => {
  console.log("selectedPlayers to delete "+JSON.stringify(players))
  setSelectedPlayers(players)
   
} 
const onRemove = (players) => {
  console.log("selectedPlayers to add "+JSON.stringify(players))
  setSelectedPlayers(players)
}


return (
  <React.Fragment>
   <EditorNavbar></EditorNavbar>
   <div className='EditClubProfile'>
   <Card >
     <CardBody>
     <h1><b>Update club</b></h1>
     <br/>
      <Form >
      <FormGroup  >
         <Label for="name">Name</Label>
         <div className='row'>
         <div className='col'>
          
         <Input id="name"  
               value={enteredName}  onChange={event => {
                 setEnteredName(event.target.value); 
               }}
            type="text" required/>
         </div>
         <div className='col'><Button onClick={ updateClubNameHandler} >CHANGE NAME</Button></div>
         
         </div>
      </FormGroup>
      <FormGroup >
              <Label for="players">Add new players</Label>
             
                   {(showPlayers) ? 
                     <div className='row'>
                           <div className='col'>
                               <Multiselect
                                   options={playersWithoutClub} 
                                  
                                   onSelect={onSelect} 
                                    onRemove={onRemove} 
                                 displayValue="playerName" 
                                    />
                          </div>
                          <div className='col'>
                          <Button onClick={ addPlayersToClubHandler} >SAVE PLAYERS</Button>
                          </div>
                     </div>
                    :  
                    null }
           
        </FormGroup>
        <Label for="players">Players</Label>
          <Table >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
          
           { showClubPlayers ? 
            <tbody>
              {clubPlayers.map((player,index)=>  
              <tr key={player.id}>
                <th scope="row"  >{index+1}</th>
                <td >{player.playerName}</td>
                <td ><Button color='danger' onClick={() => 
                  removeFromClubHandler(player.id)
                  } >REMOVE FROM CLUB</Button></td>
              </tr>
              )}
            </tbody>
            :  <tbody></tbody>
            }
          </Table>
       </Form>
      </CardBody>
   </Card>
   </div>
   </React.Fragment>
  );
    
  
};

export default EditClubProfile;
