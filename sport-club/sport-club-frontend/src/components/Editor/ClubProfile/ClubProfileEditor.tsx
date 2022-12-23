import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import SportClubProfile from '../../Clubs/SportClubProfile/SportClubProfile'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CenterWrapper from '../../styled/Wrappers/CenterWrapper';
import Button from '../../styled/Buttons/Button';
const ClubProfileEditor = () => {
  const navigate=useNavigate()
  const {id}=useParams()

  return (
    <React.Fragment>
        <EditorNavbar></EditorNavbar>
        <CenterWrapper >
        <Button onClick={() => navigate("/editor/editClubProfile/"+id)}>Edit club profile</Button>
        </CenterWrapper>
        <SportClubProfile></SportClubProfile>
    </React.Fragment>
  );
    
  
};

export default ClubProfileEditor;
