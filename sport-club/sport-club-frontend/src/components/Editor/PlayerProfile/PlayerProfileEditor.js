import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import PlayerProfile from '../../Players/PlayerProfile/PlayerProfile';
//import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const PlayerProfileEditor = props => {
  //const navigate=useNavigate()
  const {id}=useParams()
  return (
    <React.Fragment>
        <EditorNavbar></EditorNavbar>
        <div className='content'>
        <button /*  onClick={() => navigate("/editor/editPlayerProfile/"+id)}*/>Edit player profile</button>
        </div>
        <PlayerProfile></PlayerProfile>
    </React.Fragment>
  );
    
  
};

export default PlayerProfileEditor;
