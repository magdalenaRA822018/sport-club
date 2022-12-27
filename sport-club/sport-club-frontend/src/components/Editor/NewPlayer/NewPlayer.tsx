import React, { useState, useEffect } from 'react';
import axios from '../../../http-common';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../interfaces';
import { Skill } from '../../../interfaces';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import FormikForm123 from '../../Players/FormikForm/PlayerFormikForm';
const NewPlayer = () => {


    return (
      <React.Fragment>
       <EditorNavbar></EditorNavbar>
      <DashboardWrapper>
        <FormikForm123 playerId={undefined} ></FormikForm123>
        </DashboardWrapper>
        </React.Fragment>
        
      );
  
};

export default NewPlayer;
