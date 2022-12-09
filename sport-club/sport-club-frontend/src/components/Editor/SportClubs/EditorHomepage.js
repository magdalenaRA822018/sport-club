import React from 'react';
import SportClubs from '../../Clubs/SportClubs/SportClubs';
import EditorNavbar from '../Navbar/EditorNavbar';
import { useNavigate } from 'react-router-dom';
import './EditorHomepage.css'
const EditorHomepage = props => {
  const navigate = useNavigate();
  return (
    <div >   
        <EditorNavbar></EditorNavbar>
        <div className='content'>   
        <button   onClick={() => navigate("/newSportClub")}>Add new club</button>
        </div>
        <SportClubs></SportClubs>
    </div>
  );
};

export default EditorHomepage;
