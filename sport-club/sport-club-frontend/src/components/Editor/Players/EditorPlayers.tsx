import React from 'react';
import AllPlayers from '../../Players/AllPlayers/AllPlayers';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import { useNavigate } from 'react-router-dom';

import CenterWrapper from '../../styled/CenterWrapper';
import Button from '../../styled/Button';
const EditorPlayers = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>   
        <EditorNavbar></EditorNavbar>
        <CenterWrapper>   
          <Button   onClick={() => navigate("/newPlayer")}>Add new player</Button>
        </CenterWrapper>
        <AllPlayers></AllPlayers>
    </React.Fragment>
  );
};

export default EditorPlayers;
