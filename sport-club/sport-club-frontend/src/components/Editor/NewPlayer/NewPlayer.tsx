import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import PlayerFormikForm from '../../Players/FormikForm/PlayerFormikForm';
const NewPlayer = () => {
    return (
      <React.Fragment>
       <EditorNavbar></EditorNavbar>
      <DashboardWrapper>
        <PlayerFormikForm playerId={0} />
      </DashboardWrapper>
      </React.Fragment>  
    ); 
};

export default NewPlayer;
