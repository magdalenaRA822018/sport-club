import React, { useState, useEffect,useContext } from 'react';
import { SportClub } from '../../../interfaces';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';

import { Table, TD ,TR,TH} from '../../styled/Table';
import DashboardWrapper from '../../styled/DashboardWrapper';
import Button from '../../styled/Button';
const SportClubs = () => {
  const [sportClubs, setSportClubs] = useState<Array<SportClub>>([]);
  const authContext= useContext(AuthContext);
  const navigate=useNavigate();
 
  useEffect(() => {
       axios.get('sportclubs/all')
      .then(function (response) {
         setSportClubs(response.data)
      })
      .catch(function (error) {
        alert("error")
      });
     
  }, []);


  return (
    <DashboardWrapper>
    <h1>Sport clubs</h1>
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
