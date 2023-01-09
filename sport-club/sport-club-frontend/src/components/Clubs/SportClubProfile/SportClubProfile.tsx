import { useState, useEffect } from 'react';
import { Player, SportClub } from '../../../interfaces';
import axios from '../../../http-common';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { Table, TD ,TR,TH } from '../../styled/Table';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import Button from '../../styled/Buttons/Button';
import TableImage from '../../styled/Images/TableImage';
interface ClubProps {
  clubId: number;
}
const SportClubProfile = (props: ClubProps) => {

  const [sportClub, setSportClub] = useState<SportClub>({} as SportClub);
  const navigate=useNavigate()
  const players: Player[] = useAppSelector((state) => state.players.players.filter((player) => { return player.clubId == props.clubId}));
  const currentUserRole = useAppSelector((state) => state.user.userTokenState.roles)
  
  useEffect(() => {
      axios.post('sportclubs/club',{id: props.clubId})
      .then( response =>{
         setSportClub(response.data)
      })
  }, []);

  return (
    <DashboardWrapper>
    <h1><b>Sport club:  {sportClub.name}</b></h1>
    <Table>
      <tbody>
        {
        players? 
        players.map((player,index)=>  
        <TR key={player.id}>
          <TH  >{index+1}</TH>
          <TD><TableImage alt="Sample" id='playerImage'  src={player.image}/></TD>
          <TD >{player.playerName}</TD>
          <TD ><Button onClick={() => 
            { if(currentUserRole==="ROLE_EDITOR")
                navigate("/editor/playerProfile/"+player.id)
              else
              navigate("/playerProfile/"+player.id)
            }} >PROFILE</Button></TD>
            </TR>
            )
            : null
         }
       </tbody>
          
        </Table>
    
    </DashboardWrapper>
  );
};

export default SportClubProfile;
