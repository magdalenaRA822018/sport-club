import React from 'react';
import ViewerNavbar from '../ViewerNavbar/ViewerNavbar';
import SportClubProfile from '../../Clubs/SportClubProfile/SportClubProfile'
import { useParams } from 'react-router-dom';
const SportClubProfileViewer = () => {
  const {id}=useParams()
  return (
    <React.Fragment>
        <ViewerNavbar></ViewerNavbar>
        <SportClubProfile clubId={id? +id : 0}></SportClubProfile>
    </React.Fragment>
  );
};

export default SportClubProfileViewer;
