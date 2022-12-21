import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SportClub } from '../../../interfaces';
import axios from '../../../http-common';
import   './SportClubProfile.css'
import { Table, Button} from 'reactstrap';
import SportClubs from '../SportClubs/SportClubs';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
const SportClubProfile = () => {
  const [sportClub, setSportClub] = useState<SportClub>({} as SportClub);
  const { id } = useParams();
  const authContext= useContext(AuthContext);
  const navigate=useNavigate()


  useEffect(() => {
      axios.post('sportclubs/club',{id: id})
      .then(function (response) {
         setSportClub(response.data)
         console.log(sportClub.players)
      })
      .catch(function (error) {
        alert("error")
      });
  }, []);

  return (
    <div className='SportClubProfile'>
    <h1><b>Sport club:  {sportClub.name}</b></h1>
    <hr></hr>
    <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      
      <tbody>
        {sportClub.players?.map((player,index)=>  
        <tr key={player.id}>
          <th scope="row"  >{index+1}</th>
          <td><img alt="Sample" className='PlayerImage'  src={player.image}/></td>
          <td >{player.playerName}</td>
          <td ><Button onClick={() => 
            { if(authContext?.role==="ROLE_EDITOR")
                navigate("/editor/playerProfile/"+player.id)
              else
              navigate("/playerProfile/"+player.id)
            }} >PROFILE</Button></td>
            </tr>
            )}
          </tbody>
          
        </Table>
    </div>
  );
};

export default SportClubProfile;
