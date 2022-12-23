import React from 'react';
import ViewerNavBar from '../ViewerNavbar/ViewerNavbar';
import SportClubs from '../../Clubs/AllSportClubs/AllSportClubs';
const ViewerHomepage = () => {
 
  return (
    <React.Fragment>
        <ViewerNavBar></ViewerNavBar>
        <SportClubs></SportClubs>
    </React.Fragment>
  );
};

export default ViewerHomepage;
