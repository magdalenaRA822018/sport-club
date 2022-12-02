import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
const EditorNavbar = props => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return (
      <div>
        <Nav vertical>
                 <NavItem>
                     <NavLink href="#">
                      Link
                    </NavLink>
                 </NavItem>
                <NavItem>
                    <NavLink href="#">
                    Another Link
                    </NavLink>
                </NavItem>
  
        </Nav>
      </div>
    
  
  );
};

export default EditorNavbar;
