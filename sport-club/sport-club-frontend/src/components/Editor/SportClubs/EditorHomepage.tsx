import React from 'react';
import SportClubs from '../../Clubs/AllSportClubs/AllSportClubs';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import { useNavigate } from 'react-router-dom';

import Button from '../../styled/Buttons/Button';
import CenterWrapper from '../../styled/Wrappers/CenterWrapper';
const EditorHomepage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>   
        <EditorNavbar></EditorNavbar>
        <CenterWrapper>
        <Button   onClick={() => navigate("/newSportClub")}>Add new club</Button>
        </CenterWrapper>
        <SportClubs></SportClubs>
    </React.Fragment>
  );
};

export default EditorHomepage;
