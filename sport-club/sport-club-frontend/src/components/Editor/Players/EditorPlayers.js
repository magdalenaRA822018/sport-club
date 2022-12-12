import React from 'react';
import AllPlayers from '../../Players/AllPlayers/AllPlayers';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import { useNavigate } from 'react-router-dom';
import './EditorPlayers.css'
const EditorPlayers = props => {
  const navigate = useNavigate();
  return (
    <React.Fragment>   
        <EditorNavbar></EditorNavbar>
        <div className='content'>   
        <button   onClick={() => navigate("/newPlayer")}>Add new player</button>
        </div>
        <AllPlayers></AllPlayers>
    </React.Fragment>
  );
};

export default EditorPlayers;
