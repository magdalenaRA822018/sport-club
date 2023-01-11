import { HeaderBar } from "./styled-header-bar";
import WorkGroupDropdown from "../WorkGroupDropdown/WorkGroupDropdown";
import SearchBar from "../search-bar/SearchBar";
import UserProfileAndOptions from "../UserProfileAndOptions/UserProfileAndOptions";
const HeaderBarComponent = () => {
   
    return (
        <HeaderBar>
            <WorkGroupDropdown/>
            <SearchBar/>
            <UserProfileAndOptions/>
        </HeaderBar>
    );
};
  
export default HeaderBarComponent;