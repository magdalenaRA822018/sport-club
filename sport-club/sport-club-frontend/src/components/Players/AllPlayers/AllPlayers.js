import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useCallback } from 'react';
import useHttp from '../../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import   './AllPlayers.css'
import { Table, Button} from 'reactstrap';
import swal from 'sweetalert';
const AllPlayers = props => {
  const [players, setPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const {
    data,
    sendRequest,
    methodName
  } = useHttp();

  const load = useCallback(() => {
    sendRequest(
      'players/all',
      'GET',
      null,
      authContext.token,
      'PLAYERS'
    );

    }, [sendRequest]

  );
  const removePlayer = useCallback((id) => {
    sendRequest(
      'players/remove',
      'POST',
      JSON.stringify({id: id}),
      authContext.token,
      'REMOVE_PLAYERS'
    );

    }, [sendRequest]

  );

  useEffect(() => {
    load()
  }, []);
 
   useEffect(() => {
       if(data!=null){
        if(methodName==="PLAYERS"){
          setPlayers(data)
          setShow(true)
        }else if(methodName==="REMOVE_PLAYERS"){
          if(data.content==="Success"){
            load()
            swal({ icon: 'success', title: data.content,});
           }
           else {
            swal({ icon: 'error', title: data.content,});
           }
        }
       
       }
    }, [data]);
 
  const removePlayerHandler = (id) => {
    removePlayer(id)
  }

  return (
    <div className='AllPlayers'>
      <h1><b>Players</b></h1>
        <Table >
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Name</th>
                <th>Club</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
      {show ? 
              <tbody>
                {players.map((player,index)=>  
                <tr key={player.id}>
                  <th scope="row"  >{index+1}</th>
                  <td><img alt="Sample" className='PlayerImage'  src={player.image}/></td>
                  <td >{player.playerName}</td>
                  <td >{player.clubName}</td>
                  <td ><Button  onClick={() => 
                    { 
                        navigate("/editor/playerProfile/"+player.id)
                    }}>PROFILE</Button>
                  </td>
                  <td ><Button  color='danger' onClick={() => 
                    removePlayerHandler(player.id.toString())}>REMOVE</Button>
                  </td>
                </tr>
                )}
              </tbody>
         :  <tbody></tbody>}
        </Table>
    </div>
  );
};

export default AllPlayers;
