import  {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import TableImage from '../../styled/Images/TableImage';
import { Table, TD ,TR,TH} from '../../styled/Table';
import Button from '../../styled/Buttons/Button';
import RedButton from '../../styled/Buttons/RedButton';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { loadPlayers, removePlayer } from '../../../store/features/playerSlice';
const AllPlayers = () => {
  const navigate = useNavigate();
  const players = useAppSelector((state) => state.players.players);
  const loadingPlayers = useAppSelector((state) => state.players.loading)
  const dispatch = useAppDispatch()
 
  const removePlayerHandler = (id:number) => {
      dispatch(removePlayer(id))
  }
  useEffect(() => {
      if(!players.length) dispatch(loadPlayers())
  }, []);
  return (
    <DashboardWrapper>
    <h1><b>Players</b></h1>
    { loadingPlayers ?
      'Loading...' :
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
    }
        
    </DashboardWrapper>
  );
};

export default AllPlayers;
