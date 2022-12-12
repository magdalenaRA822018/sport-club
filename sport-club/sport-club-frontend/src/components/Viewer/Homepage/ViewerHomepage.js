import React from 'react';
import ViewerNavBar from '../ViewerNavbar/ViewerNavbar';
import SportClubs from '../../Clubs/SportClubs/SportClubs';
const ViewerHomepage = props => {
 
  return (
    <React.Fragment>
        <ViewerNavBar></ViewerNavBar>
        <SportClubs></SportClubs>
    </React.Fragment>
  );
};

export default ViewerHomepage;
