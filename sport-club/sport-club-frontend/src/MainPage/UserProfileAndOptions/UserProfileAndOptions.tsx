import { ActivityStatus, UserImage, UserProfileAndOptionsFrame } from "./styled-user-profile-and-options"

const UserProfileAndOptions = () => {
   
    return (
       <UserProfileAndOptionsFrame>
            <UserImage url="" ></UserImage>
            <ActivityStatus></ActivityStatus>
       </UserProfileAndOptionsFrame>
    );
};
  
export default UserProfileAndOptions;