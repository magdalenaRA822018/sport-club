import React from 'react';
import AllPlayers from '../../Players/AllPlayers/AllPlayers';
import EditorNavbar from '../Navbar/EditorNavbar';
import { useNavigate } from 'react-router-dom';
import './EditorPlayers.css'
const EditorPlayers = props => {
  const navigate = useNavigate();
  return (
    <div >   
        <EditorNavbar></EditorNavbar>
        <div className='content'>   
        <button   onClick={() => navigate("/newPlayer")}>Add new player</button>
        </div>
        <AllPlayers></AllPlayers>
    </div>
  );
};

export default EditorPlayers;
