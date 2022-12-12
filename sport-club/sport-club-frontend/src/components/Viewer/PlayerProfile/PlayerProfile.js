import React from 'react';
import ViewerNavbar from '../ViewerNavbar/ViewerNavbar';
import PlayerProfile from '../../Players/PlayerProfile/PlayerProfile';

const PlayerProfileViewer = props => {
  
  return (
    <React.Fragment>
        <ViewerNavbar></ViewerNavbar>
        <PlayerProfile></PlayerProfile>
    </React.Fragment>
  );
    
};

export default PlayerProfileViewer;
