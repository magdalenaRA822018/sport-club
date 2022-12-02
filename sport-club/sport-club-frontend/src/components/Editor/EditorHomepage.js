import React from 'react';
import EditorNavbar from '../EditorNavbar';
import SportClubs from '../SportClubs';
//import { Button, FormGroup,Form, Label, Input ,Card,CardBody} from 'reactstrap';
const EditorHomepage = props => {

 
  return (
    <div >
       <EditorNavbar/>
        <SportClubs></SportClubs>
    </div>
  );
};

export default EditorHomepage;
