import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SportClub } from '../../../interfaces';
import axios from '../../../http-common';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';


import { Table, TD ,TR,TH } from '../../styled/Table';
import DashboardWrapper from '../../styled/DashboardWrapper';
import Button from '../../styled/Button';
import TableImage from '../../styled/TableImage';

const SportClubProfile = () => {
  const [sportClub, setSportClub] = useState<SportClub>({} as SportClub);
  const { id } = useParams();
  const authContext= useContext(AuthContext);
  const navigate=useNavigate()


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
    <DashboardWrapper>
    <h1>Sport club:  {sportClub.name}</h1>

    <Table >
      <tbody>
        {sportClub.players?.map((player,index)=>  
        <TR key={player.id}>
          <TH  >{index+1}</TH>
          <TD><TableImage alt="Sample" id='playerImage'  src={player.image}/></TD>
          <TD >{player.playerName}</TD>
          <TD ><Button onClick={() => 
            { if(authContext?.role==="ROLE_EDITOR")
                navigate("/editor/playerProfile/"+player.id)
              else
              navigate("/playerProfile/"+player.id)
            }} >PROFILE</Button></TD>
            </TR>
            )}
       </tbody>
          
        </Table>
    </DashboardWrapper>
  );
};

export default SportClubProfile;