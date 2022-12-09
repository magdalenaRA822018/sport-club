import React from 'react';
import { Navbar } from 'reactstrap';
import ViewerNavBar from '../ViewerNavbar/ViewerNavbar';
import SportClubs from '../../Clubs/SportClubs/SportClubs';
const ViewerHomepage = props => {
 
  return (
    <div >
        <ViewerNavBar></ViewerNavBar>
        <SportClubs></SportClubs>
    </div>
  );
};

export default ViewerHomepage;
