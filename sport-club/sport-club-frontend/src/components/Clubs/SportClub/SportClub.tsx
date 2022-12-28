import React from 'react';
import { Row,Col } from './sport-club-styled/SportClubStyled';
import Button from '../../styled/Buttons/Button';
interface SportClubProp {
    index: number;
    clubName: string;
    id: number;
    openProfile(id: number): void;
  }
const SportClubComponent = (props: SportClubProp) => {
  return (
          <Row >
             <Col >{props.index}</Col>
             <Col>{props.clubName}</Col>
             <Col>
             <Button  onClick={()=> {props.openProfile(props.id)}}>PROFILE</Button>
             </Col>
          </Row>
  );
};

export default SportClubComponent;
