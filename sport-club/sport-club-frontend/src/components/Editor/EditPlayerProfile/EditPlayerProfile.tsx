import React from 'react';
import { useParams } from 'react-router-dom';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import PlayerForm from '../../Players/PlayerForm/PlayerForm';

const EditPlayerProfile = () => {
  const {id} = useParams()
 
    return (
      <React.Fragment>
        <EditorNavbar/>
        <DashboardWrapper>
        <PlayerForm playerId={id} />
        </DashboardWrapper>
      </React.Fragment>
    );
  
};

export default EditPlayerProfile;
