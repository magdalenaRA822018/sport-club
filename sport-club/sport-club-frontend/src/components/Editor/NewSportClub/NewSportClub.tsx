import React, { useState, useEffect } from 'react';
import axios from '../../../http-common'
import { useNavigate } from 'react-router-dom';
import { SportClub } from '../../../interfaces';
import { Player } from '../../../interfaces';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import Multiselect from 'multiselect-react-dropdown';
import swal from 'sweetalert';
import Card from '../../styled/Card';
import {Button} from 'reactstrap';
import DashboardWrapper from '../../styled/DashboardWrapper';
import Input from '../../styled/Input';
const NewSportClub = () => {
  const [enteredName, setEnteredName] = useState<string>('');
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [selectedPlayers, setSelectedPlayers] =  useState<Array<Player>>([]);

  const navigate=useNavigate()

  const onSelect = (selectedPlayers:Array<Player>)=>{
    setSelectedPlayers(selectedPlayers)
  }
  const onRemove = (selectedPlayers:Array<Player>)=>{
    setSelectedPlayers(selectedPlayers)
  }
  useEffect(()=>{
        axios.get('players/withoutClub')
        .then(function (response) {
          setPlayers(response.data)
        })
        .catch(function (error) {
          alert("error")
        });


        return setSelectedPlayers([])
  }, [])


  const newClubHandler = (event: React.FormEvent) => {
      event.preventDefault()
      const club : SportClub={
        id: 0,
        name: enteredName,
        players: selectedPlayers,
      }
      axios.post('sportclubs/new',club)
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
        alert("error")
      });
  }
 
    return (
      <React.Fragment>
         <EditorNavbar></EditorNavbar>
        <DashboardWrapper>
        <Card>
          <h1 ><b>Add new club</b></h1>
          <form onSubmit={newClubHandler}>
              <label htmlFor='name' >Name</label>
              <Input id="name"  value={enteredName} type="text"
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => 
                      { setEnteredName(event.target.value)}} 
              required/>
          
              <label htmlFor='players'>Players</label>
             {players?
              <Multiselect
                     options={players} 
                     onSelect={onSelect} 
                     onRemove={onRemove} 
                     displayValue="playerName" 
              />
              : null
             }
                   
          <Button type="submit"  >Submit</Button>
            
            </form>

        </Card>
        </DashboardWrapper>
        </React.Fragment>
      );
  
};

export default NewSportClub;