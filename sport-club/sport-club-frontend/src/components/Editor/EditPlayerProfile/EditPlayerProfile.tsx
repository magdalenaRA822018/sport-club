import React from 'react';
import { useParams } from 'react-router-dom';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import PlayerFormikForm from '../../Players/FormikForm/PlayerFormikForm';
const EditPlayerProfile = () => {
    const {id} = useParams()
    return (
      <React.Fragment>
        <EditorNavbar/>
        <DashboardWrapper>
        <PlayerFormikForm playerId={id} />
        </DashboardWrapper>
      </React.Fragment>
    );
  
};

export default EditPlayerProfile;
