import React, { useState, useEffect,useContext } from 'react';
import { SportClub } from '../../../interfaces';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';

import { Table, TD ,TR,TH} from '../../styled/Table';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import Button from '../../styled/Buttons/Button';
const SportClubs = () => {
  const [sportClubs, setSportClubs] = useState<SportClub[]>([]);
  const authContext= useContext(AuthContext);
  const navigate=useNavigate();
 
  useEffect(() => {
       axios.get('sportclubs/all')
      .then(function (response) {
         setSportClubs(response.data)
      })
     
  }, []);


  return (
    <DashboardWrapper>
    <h1><b>Sport clubs</b></h1>
    <Table >
      <tbody>
        {sportClubs?.map((sportClub,index)=>  
        <TR key={sportClub.id}>
          <TH scope="row"  >{index+1}</TH>
          <TD >{sportClub.name}</TD>
          <TD ><Button  onClick={() => 
            {if(authContext?.role==="ROLE_EDITOR")
                navigate("/editor/clubProfile/"+sportClub.id)
              else
              navigate("/clubProfile/"+sportClub.id)
            }}>PROFILE</Button></TD>
        </TR>
        )}
      </tbody>
     
    </Table>
      
    </DashboardWrapper>
  );
};

export default SportClubs;
