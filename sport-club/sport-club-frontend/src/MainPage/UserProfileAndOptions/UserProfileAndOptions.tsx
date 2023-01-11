import { useEffect } from "react";
import { ActivityStatus, UserImage, UserProfileAndOptionsFrame } from "./styled-user-profile-and-options"
import '../../images/proba.jpg'
const UserProfileAndOptions = () => {
   
    useEffect(()=>{
      
    },[])


    return (
       <UserProfileAndOptionsFrame>
            <UserImage  src={require('../../images/proba.jpg')} ></UserImage>
            <ActivityStatus></ActivityStatus>
       </UserProfileAndOptionsFrame>
    );
};
  
export default UserProfileAndOptions;