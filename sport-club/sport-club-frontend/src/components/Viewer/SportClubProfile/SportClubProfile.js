import React from 'react';
import ViewerNavbar from '../ViewerNavbar/ViewerNavbar';
import SportClubProfile from '../../Clubs/SportClubProfile/SportClubProfile'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SportClubProfile.css'
const SportClubProfileViewer = props => {
  const navigate=useNavigate()
  const {id}=useParams()
  return (
    <div>
        <ViewerNavbar></ViewerNavbar>
        <SportClubProfile></SportClubProfile>
    </div>
  );
    
  
};

export default SportClubProfileViewer;
