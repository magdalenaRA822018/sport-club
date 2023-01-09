import React, {FC} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom"
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Auth from './components/Auth/Login/Auth';
import Signup from './components/Auth/Signup/Signup'

import EditProfile from './components/Auth/EditProfile/EditProfile';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword';

import EditorHomepage from './components/Editor/SportClubs/EditorHomepage';
import EditorPlayers from './components/Editor/Players/EditorPlayers';
import NewSportClub from './components/Editor/NewSportClub/NewSportClub';
import NewPlayer from './components/Editor/NewPlayer/NewPlayer';
import ClubProfileEditor from './components/Editor/ClubProfile/ClubProfileEditor';
import PlayerProfileEditor from './components/Editor/PlayerProfile/PlayerProfileEditor';
import EditClubProfile from './components/Editor/EditClubProfile/EditClubProfile';
import EditPlayerProfile from './components/Editor/EditPlayerProfile/EditPlayerProfile';

import ViewerHomepage from './components/Viewer/Homepage/ViewerHomepage';
import SportClubProfileViewer from './components/Viewer/SportClubProfile/SportClubProfile';
import PlayerProfileViewer from './components/Viewer/PlayerProfile/PlayerProfile';

import MainPage from './MainPage/MainPage';
const ROLES = {
   'EDITOR': 'ROLE_EDITOR',
   'VIEWER': 'ROLE_VIEWER',
 }
const App: FC = ()  => {
  
  
  return (
  <Routes>
   <Route path='/' element={<Layout/>}>

   <Route path='/' element={<Auth/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/frontend' element={<MainPage/>}/>
  
   <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR,ROLES.VIEWER]} />} >
      <Route path='/editProfile' element={<EditProfile/>}/>
      <Route path='/changePassword' element={<ChangePassword/>}/>
   </Route>

   <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]}/>}>
      <Route path='/editor/sportclubs' element={<EditorHomepage/>}/>
      <Route path='/editor/players' element={<EditorPlayers/>}/>
      <Route path='/newPlayer' element={<NewPlayer/>}/>
      <Route path='/newSportClub' element={<NewSportClub/>}/>
      <Route path='/editor/clubProfile/:id' element={<ClubProfileEditor/>}/>
      <Route path='/editor/editClubProfile/:id' element={<EditClubProfile />}/>
      <Route path='/editor/playerProfile/:id' element={<PlayerProfileEditor/>}/>
      <Route path='/editor/editPlayerProfile/:id' element={<EditPlayerProfile/>}/>
   </Route>

   <Route element={<RequireAuth allowedRoles={[ROLES.VIEWER]}/>}>
      <Route path='/viewer/sportclubs' element={<ViewerHomepage/>}/>
      <Route path='/clubProfile/:id' element={<SportClubProfileViewer/>}/>
      <Route path='/playerProfile/:id' element={<PlayerProfileViewer/>}/>
   </Route>
   </Route>
   </Routes>
    
  )
  
  ;
};

export default App;
