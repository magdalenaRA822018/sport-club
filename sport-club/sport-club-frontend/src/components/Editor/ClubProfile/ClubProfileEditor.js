import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import SportClubProfile from '../../Clubs/SportClubProfile/SportClubProfile'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ClubProfileEditor.css'

const ClubProfileEditor = props => {
  const navigate=useNavigate()
  const {id}=useParams()

  return (
    <React.Fragment>
        <EditorNavbar></EditorNavbar>
        <div className='content' >
        <button onClick={() => navigate("/editor/editClubProfile/"+id)}>Edit club profile</button>
        </div>
        <SportClubProfile></SportClubProfile>
    </React.Fragment>
  );
    
  
};

export default ClubProfileEditor;
