import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useCallback } from 'react';
import useHttp from '../../../hooks/useHttp';
import   './SportClubProfile.css'
import { Table, Button} from 'reactstrap';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
const SportClubProfile = props => {
  const [sportClubName, setSportClubName] = useState('');
  const [sportClubPlayers, setSportClubPlayers] = useState([]);
  const [showPlayers, setShowPlayers]=useState(false)
  const authContext = useContext(AuthContext);
  let { id } = useParams();
  //const navigate = useNavigate();
  const {
    data,
    sendRequest,
  } = useHttp();

  const loadSportClub = useCallback(() => {
    sendRequest(
      'sportclubs/club',
      'POST',
      JSON.stringify({id: id}),
      authContext.token,
      'SPORTCLUBINFO'
    );

    }, [sendRequest]);

 
   useEffect(() => {
       if(data!=null){
        setSportClubName(data.name)
        setSportClubPlayers(data.players)
        setShowPlayers(true)
       }
    }, [data]);
 
    useEffect(() => {
        loadSportClub()
      }, []);

  return (
    <div className='SportClubProfile'>
    <h1><b>Sport club:  {sportClubName}</b></h1>
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
            { /*if(authContext.role==="ROLE_EDITOR")
                navigate("/editor/playerProfile/"+player.id)
              else
              navigate("/playerProfile/"+player.id)*/
            }} >PROFILE</Button></td>
        </tr>
        )}
      </tbody>
      :  <tbody></tbody>}
    </Table>
          
    </div>
  );
};

export default SportClubProfile;
