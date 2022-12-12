import React from 'react';
import ViewerNavbar from '../ViewerNavbar/ViewerNavbar';
import SportClubProfile from '../../Clubs/SportClubProfile/SportClubProfile'
import './SportClubProfile.css'
const SportClubProfileViewer = props => {
  return (
    <React.Fragment>
        <ViewerNavbar></ViewerNavbar>
        <SportClubProfile></SportClubProfile>
    </React.Fragment>
  );
    
  
};

export default SportClubProfileViewer;
