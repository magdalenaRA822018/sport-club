import React, { useContext } from 'react';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom"
import Signup from './components/Signup'
import EditorHomepage from './components/Editor/EditorHomepage';
import ViewerHomepage from './components/Viewer/ViewerHompegae';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
const ROLES = {
  'EDITOR': 'ROLE_EDITOR',
  'VIEWER': 'ROLE_VIEWER',
}
const App = props => {
 // const authContext = useContext(AuthContext);

  /*let content = <Auth />;
  if (authContext.isAuth && authContext.role==="ROLE_EDITOR") {
    content = <EditorHomepage />;
  }
  if (authContext.isAuth && authContext.role==="ROLE_VIEWER") {
    content = <ViewerHomepage />;
  }*/

  
  return (
    <Routes>
        <Route path='/' element={<Layout/>} >
            <Route path='/' element={<Auth/>}    />
            <Route path='/signup' element={<Signup/>}    />
            <Route path='unauthorized' element={<Unauthorized />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]}/>} >
               <Route path='/editor/home' element={<EditorHomepage/>}    />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.VIEWER]}/>} >
               <Route path='/viewer/home' element={<ViewerHomepage/>}    />
            </Route>
        </Route>
    </Routes>
    
  )
  
  ;
};

export default App;
