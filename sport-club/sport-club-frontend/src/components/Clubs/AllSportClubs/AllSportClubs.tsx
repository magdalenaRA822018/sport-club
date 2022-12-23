import { useState, useEffect,useContext } from 'react';
import { SportClub } from '../../../interfaces';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import SportClubComponent from '../SportClub/SportClub'
const AllSportClubs = () => {
  const [sportClubs, setSportClubs] = useState<SportClub[]>([]);
  const authContext= useContext(AuthContext);
  const navigate=useNavigate();
 
  useEffect(() => {
       axios.get('sportclubs/all')
      .then((response)=> {
         setSportClubs(response.data)
      })
     
  }, []);

  const openProfile = (id: number) : void => {
    if(authContext?.role==="ROLE_EDITOR") navigate("/editor/clubProfile/"+id)
    else navigate("/clubProfile/"+id)
  }
  
  return (
    <DashboardWrapper>
    <h1><b>Sport clubs</b></h1>
       {sportClubs?.map((sportClub,index)=>  
        <SportClubComponent 
             key={sportClub.id}
             index={index+1}
             clubName={sportClub.name}
             id={+sportClub.id}    
             openProfile={openProfile} 
        />
        )}
    </DashboardWrapper>
  );
};

export default AllSportClubs;
