import React, {useContext} from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { Bar, NavBarToggle, MainNav, NavLi, NavLinkk } from '../../styled/NavBar';
const EditorNavbar = () => {
  const navigate = useNavigate();
  const authContext=useContext(AuthContext);
  return (
    <React.Fragment>
    <Bar>
      <NavBarToggle >
        SportAPP
      </NavBarToggle>
      <MainNav >
          <NavLi>
              <NavLinkk onClick={() => navigate("/editor/sportclubs")} >Sport clubs</NavLinkk>
          </NavLi>
          <NavLi>
              <NavLinkk onClick={() => navigate("/editor/players")}  >Players</NavLinkk>
          </NavLi>
          <NavLi>
              <NavLinkk onClick={() => navigate("/editProfile")}   >My profile</NavLinkk>
          </NavLi>
          <NavLi>
              <NavLinkk onClick={() => authContext?.logout()}   >Logout</NavLinkk>
          </NavLi>
      </MainNav>
    </Bar> 
    </React.Fragment>
  );
    
  
};

export default EditorNavbar;
