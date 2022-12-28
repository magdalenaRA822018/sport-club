import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../interfaces';
import axios from '../../../http-common';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import TableImage from '../../styled/Images/TableImage';
import { Table, TD ,TR,TH} from '../../styled/Table';
import Button from '../../styled/Buttons/Button';
import RedButton from '../../styled/Buttons/RedButton';
const AllPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  
 
  const removePlayerHandler = (id:number) => {
      axios.post('players/remove',{id: id})
      .then( response=> {
        const newPlayers = players.filter(player=> player.id!=id);
        setPlayers(newPlayers)
        alert("success")
      })
      .catch( error=> {
        alert(error.response.data.content)
      });
  }
  useEffect(() => {
      axios.get('players/all')
      .then( (response)=> {
         setPlayers(response.data)
      })
  
  }, []);
  return (
    <DashboardWrapper>
    <h1><b>Players</b></h1>
        <Table >
              <tbody>
                {players?.map((player,index)=>  
                <TR key={player.id}>
                  <TH>{index+1}</TH>
                  <TD>
                     <TableImage alt="Sample" className='PlayerImage'  src={player.image}/>
                  </TD>
                  <TD>{player.playerName}</TD>
                  <TD>{player.clubName}</TD>
                  <TD>
                    <Button  onClick={() => {navigate("/editor/playerProfile/"+player.id)} }>PROFILE</Button>
                  </TD>
                  <TD>
                    <RedButton  color='danger' onClick={() => removePlayerHandler(player.id)}>REMOVE</RedButton>
                  </TD>
                </TR>
                )}
              </tbody>
        </Table>
    </DashboardWrapper>
  );
};

export default AllPlayers;
