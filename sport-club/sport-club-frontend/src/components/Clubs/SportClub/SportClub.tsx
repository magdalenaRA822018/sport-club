import React, { useState, useEffect,useContext,FC } from 'react';
import { SportClub } from '../../../interfaces';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';

import { Table, TD ,TR,TH} from '../../styled/Table';
import DashboardWrapper from '../../styled/Wrappers/DashboardWrapper';
import Button from '../../styled/Buttons/Button';
interface SportClubProp {
    index: number;
    clubName: string;
    id: number;
    openProfile(id: number): void;
  }
const SportClubComponent = (props: SportClubProp) => {
  return (
    <React.Fragment>
       <div>
          <div className='row' >
             <div className='col' >
             {props.index}
             </div>
             <div className='col' >
             {props.clubName}
             </div>
             <div className='col' >
             <Button  onClick={()=> {props.openProfile(props.id)}}>PROFILE</Button>
             </div>
          </div>
      </div>
    </React.Fragment>

  );
};

export default SportClubComponent;
