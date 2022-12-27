import React, { useState, useEffect,useContext,FC } from 'react';
import { SportClub } from '../../../interfaces';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from '../../../http-common';
import { Content,ContentBox } from './sport-club-styled/SportClubStyled';
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
       
          <ContentBox >
             <Content >
             {props.index}
             </Content>
             <Content>
             {props.clubName}
             </Content>
             <Content>
             <Button  onClick={()=> {props.openProfile(props.id)}}>PROFILE</Button>
             </Content>
          </ContentBox>
     
    </React.Fragment>

  );
};

export default SportClubComponent;
