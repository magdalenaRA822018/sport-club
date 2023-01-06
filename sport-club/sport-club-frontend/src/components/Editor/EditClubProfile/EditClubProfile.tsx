import React from 'react';
import EditorNavbar from '../EditorNavbar/EditorNavbar';
import { useParams } from 'react-router-dom';
import ClubForm from '../ClubForm/ClubForm';
const EditClubProfile = () => {
  const {id} = useParams()

  return (
    <React.Fragment>
    <EditorNavbar></EditorNavbar>
    <ClubForm clubId={id? +id: 0} ></ClubForm>
    </React.Fragment>
    );
  };

export default EditClubProfile;
