import React from 'react';
import Auth from './components/Auth';
import {Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Signup from './components/Signup'
import EditorHomepage from './components/Editor/EditorHomepage';
import ViewerHomepage from './components/Viewer/ViewerHompegae';
import Unauthorized from './components/Unauthorized';
import SportClubs from './components/SportClubs';

const ROLES = {
  EDITOR: 'ROLE_EDITOR',
  VIEWER: 'ROLE_VIEWER',
}


function App() {

  return (
    <Routes>
    <Route path='/' element={<Layout/>} >
        <Route path='/' element={<Auth/>}    />
        <Route path='/signup' element={<Signup/>}    />
        <Route path='unauthorized' element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]}/>} >
           <Route path='/editor/home' element={<SportClubs/>}    />

        </Route>

        <Route element={<RequireAuth  allowedRoles={[ROLES.VIEWER]}/>} >
           <Route path='/viewer/home' element={<ViewerHomepage/>}    />
        </Route>
    </Route>
</Routes>
  );
}

export default App;
