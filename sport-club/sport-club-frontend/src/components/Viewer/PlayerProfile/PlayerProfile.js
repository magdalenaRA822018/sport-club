import React from 'react';
import ViewerNavbar from '../ViewerNavbar/ViewerNavbar';
import PlayerProfile from '../../Players/PlayerProfile/PlayerProfile';

const PlayerProfileViewer = props => {
  
  return (
    <div>
        <ViewerNavbar></ViewerNavbar>
        <PlayerProfile></PlayerProfile>
    </div>
  );
    
  
};

export default PlayerProfileViewer;
