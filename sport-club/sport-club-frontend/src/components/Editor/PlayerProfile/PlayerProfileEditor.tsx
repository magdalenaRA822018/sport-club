import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import PlayerProfile from '../../Players/PlayerProfile/PlayerProfile';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CenterWrapper from '../../styled/Wrappers/CenterWrapper';
import Button from '../../styled/Buttons/Button';
const PlayerProfileEditor = () => {
  const navigate=useNavigate()
  const {id}=useParams()
  return (
    <React.Fragment>
        <EditorNavbar></EditorNavbar>
        <CenterWrapper>
           <Button  onClick={() => navigate("/editor/editPlayerProfile/"+id)}>Edit player profile</Button>
        </CenterWrapper>
        <PlayerProfile></PlayerProfile>
    </React.Fragment>
  );
    
  
};

export default PlayerProfileEditor;
