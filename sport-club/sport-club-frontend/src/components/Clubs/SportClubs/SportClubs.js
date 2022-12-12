import React, { useState, useEffect,useContext,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import useHttp from '../../../hooks/useHttp';
import   './SportClubs.css'
import { Table, Button} from 'reactstrap';

const SportClubs = props => {
  const [sportClubs, setSportClubs] = useState([]);
  const [show, setShow] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data,
    sendRequest,
  } = useHttp();

  const load = useCallback(() => {
    sendRequest(
      'sportclubs/all',
      'GET',
      null,
      authContext.token,
      'SPORTCLUBS'
    );

    }, [sendRequest]

  );

  useEffect(() => {

    load()
  }, []);
 
   useEffect(() => {
       if(data!=null){
        setSportClubs(data)
        setShow(true)
       }
    }, [data]);
 
 

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
        {if(authContext.role==="ROLE_EDITOR")
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
