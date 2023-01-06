import React, {useEffect, useState} from 'react';
import { Player } from '../../../interfaces';
import { SportClub } from '../../../interfaces';
import axios from '../../../http-common'
import Card from '../../styled/Cards/Card';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import { Table, TH,TD,TR } from '../../styled/Table';
import Input from '../../styled/Input';
import GreenButton from '../../styled/Buttons/GreenButton';
import RedButton from '../../styled/Buttons/RedButton';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import swal from 'sweetalert';
interface EditClubProps {
  clubId: number;
}
const ClubForm = (props: EditClubProps) => {
  const [enteredName, setEnteredName] = useState<string>('');
  const playersWithoutClub: Player[] = useAppSelector((state) => state.players.players.filter((player) => {return player.clubId == 0}));
  const clubPlayers: Player[] = useAppSelector((state) => state.players.players.filter((player) => {return player.clubId == props.clubId}));


  const updateClubNameHandler = (e: React.FormEvent)=>{
    e.preventDefault()
    if(enteredName==="" || !props.clubId) return;
    const sportClub: SportClub ={
      id: props.clubId,
      name: enteredName,
      players: []
    }
    axios.post('sportclubs/update', sportClub)
    .then(response=>{
      alert(response.data.content)
            return response;
    })
    .catch(error=> {
      alert("error")
    });
  }

  const addPlayerToClubHandler = (player: Player)=>{
    if(!props.clubId) return;
          /*axios.post('players/addToClub', {clubId: props.clubId, playerId: player.id})
          .then( (response) => {
            const newClubPlayers: Array<Player> = [...clubPlayers, player]  
            setClubPlayers(newClubPlayers)
            setPlayersWithoutClub(playersWithoutClub.filter(p=> p.id!=player.id))
          })
          .catch( (error) => {
            alert("error")
          });
  */
  }
  const removeFromClubHandler = (player : Player) => {
    let id = player.id
   /* axios.post('players/removeFromClub', {playerId: player.id})
    .then( (response) => {
      setClubPlayers(clubPlayers.filter(player=> player.id!=id))
      setPlayersWithoutClub([...playersWithoutClub, player])
      
    })
    .catch( (error) =>{
      alert("error")
    });*/
  }


  useEffect(()=>{
  /*  axios.get('players/withoutClub')
    .then( (response)=> {
      setPlayersWithoutClub(response.data)
    })
    .catch( (error)=> {
      alert("error")
    });

    axios.post('sportclubs/club', {id: id})
    .then( (response)=> {
      setEnteredName(response.data.name)
      setClubPlayers(response.data.players)
    })
    .catch( (error) =>{
      alert("error")
    });
*/

  }, [])
    
 


  return (
    <DashboardWrapper>
    <Card >

      <h1><b>Update club</b></h1>
      <br/>
        <form >

          <label htmlFor='name'>Name</label>
          <div className='row'>
          <div className='col'>
            
          <Input id="name" value={enteredName} type="text"
                onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                  { setEnteredName(event.target.value)}} 
          required/>
          </div>
          <div className='col'><GreenButton onClick={ updateClubNameHandler} >CHANGE NAME</GreenButton></div>
          </div>
          
                    
          <br></br>
          <label htmlFor='players' >Club players</label>
          <hr></hr>
             {
              clubPlayers.length>0 ? 
              <Table >
              <tbody>
                {clubPlayers.map((player,index)=>  
                <TR key={player.id}>
                  <TH scope="row"  >{index+1}</TH>
                  <TD >{player.playerName}</TD>
                  <TD ><RedButton color='danger' 
                    onClick={ (e: React.FormEvent) => { e.preventDefault(); removeFromClubHandler(player) } } 
                    
                    >REMOVE FROM CLUB</RedButton>
                    
                  </TD>
                </TR>
                )}
              </tbody>
            </Table>
             :  <p>No players</p>
             }
          

            <br></br>
            <label htmlFor='players'>Players without club</label>
            <hr></hr>
            <Table >
            
            <tbody>
              {playersWithoutClub.map((player,index)=>  
              <TR key={player.id}>
                <TH scope="row"  >{index+1}</TH>
                <TD >{player.playerName}</TD>
                <TD ><GreenButton color='danger' 
                  onClick={ (e: React.FormEvent) => { e.preventDefault(); addPlayerToClubHandler(player) } } 
                  
                  >ADD TO CLUB</GreenButton>
                  
                </TD>
              </TR>
              )}
            </tbody>
            
          </Table>
              
        </form>
    
    </Card>
    </DashboardWrapper>
    );
      
    
  };

export default ClubForm;
