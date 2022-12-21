import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useParams } from 'react-router-dom';
import { SportClub } from '../../../interfaces';
import axios from '../../../http-common';
import   './SportClubProfile.css'
import { Table, Button} from 'reactstrap';

//import { useNavigate } from 'react-router-dom';
const SportClubProfile = () => {
  const [sportClub, setSportClub] = useState<SportClub>({} as SportClub);
  let { id } = useParams();

  const [sportClubName, setSportClubName] = useState('');
  const [sportClubPlayers, setSportClubPlayers] = useState([]);
  const [showPlayers, setShowPlayers]=useState(false)
  const authContext = useContext(AuthContext);
  
  
  /*const loadSportClub = useCallback(() => {
    sendRequest(
      'sportclubs/club',
      'POST',
      JSON.stringify({id: id}),
      authContext.token,
      'SPORTCLUBINFO'
    );

    }, [sendRequest]);

 */
   /*useEffect(() => {
       if(data!=null){
        setSportClubName(data.name)
        setSportClubPlayers(data.players)
        setShowPlayers(true)
       }
    }, [data]);
 */


    useEffect(() => {
      axios.post('sportclubs/club',{id: id})
      .then(function (response) {
         setSportClub(response.data)
      })
      .catch(function (error) {
        alert("error")
      });
    
    }, []);

  return (
    <div className='SportClubProfile'>
    <h1><b>Sport club:  {sportClub.name}</b></h1>
    <hr></hr>
          
    </div>
  );
};

export default SportClubProfile;
/*

<Table >
      <thead>
        <tr>
          <th>#</th>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      {showPlayers ? 
      <tbody>
        {sportClubPlayers.map((player,index)=>  
        <tr key={player.id}>
          <th scope="row"  >{index+1}</th>
          <td><img alt="Sample" className='PlayerImage'  src={player.image}/></td>
          <td >{player.playerName}</td>
          <td ><Button onClick={() => 
            { if(authContext.role==="ROLE_EDITOR")
                navigate("/editor/playerProfile/"+player.id)
              else
              navigate("/playerProfile/"+player.id)
            }} >PROFILE</Button></td>
            </tr>
            )}
          </tbody>
          :  <tbody></tbody>}
        </Table>
        */