import React, { useState, useEffect,useContext,useCallback } from 'react';
import { SportClub } from '../../../interfaces';
import   './SportClubs.css'
import { Table, Button} from 'reactstrap';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';
const SportClubs = () => {
  const [sportClubs, setSportClubs] = useState<Array<SportClub>>([]);
  const [show, setShow] = useState(false);
  const authContext= useContext(AuthContext);
  const navigate=useNavigate();
 
  useEffect(() => {
       axios.get('sportclubs/all')
      .then(function (response) {
         setShow(true)
         setSportClubs(response.data)
      })
      .catch(function (error) {
        alert("error")
      });
     
  }, []);


  return (
    <div className='SportClubs'>
    <h1><b>Sport clubs</b></h1>
    <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      {show ? 
      <tbody>
        {sportClubs.map((sportClub,index)=>  
        <tr key={sportClub.id}>
          <th scope="row"  >{index+1}</th>
          <td >{sportClub.name}</td>
          <td ><Button  onClick={() => 
            {if(authContext?.role==="ROLE_EDITOR")
                navigate("/editor/clubProfile/"+sportClub.id)
              else
              navigate("/clubProfile/"+sportClub.id)
            }}>PROFILE</Button></td>
        </tr>
        )}
      </tbody>
      :  <tbody></tbody>}
    </Table>
      
    </div>
  );
};

export default SportClubs;
