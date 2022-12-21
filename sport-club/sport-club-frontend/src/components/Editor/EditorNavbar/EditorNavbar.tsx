import React, {useContext} from 'react';
import './EditorNavbar.css'
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
const EditorNavbar = () => {
  const navigate = useNavigate();
  const authContext=useContext(AuthContext);
  return (
    <React.Fragment>
      <Navbar color='dark'   dark >
        <NavbarBrand href="/">SportAPP</NavbarBrand>
            <Nav>
                <NavItem>
                      <NavLink  onClick={() => navigate("/editor/sportclubs")} className='navLink' href="#">Sport clubs</NavLink>
                </NavItem>
                <NavItem>
                      <NavLink  onClick={() => navigate("/editor/players")} className='navLink' href="#">Players</NavLink>
                </NavItem>
                <NavItem>
                      <NavLink onClick={() => navigate("/editProfile")}  className='navLink' href="#">My profile</NavLink>
                </NavItem>
                <NavItem>
                      <NavLink  onClick={() => authContext?.logout()} className='navLink' href="#">Logout</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </React.Fragment>
  );
    
  
};

export default EditorNavbar;
