import { SearchBarFrame } from "./styled-search-bar";
import { SearchIcon, SearchIconEllipseFrame, SearchIconHandleFrame, SearchText } from "./styled-search-bar";
import { SearchEllipseIcon, SearchHandleIcon } from "../styled-icons";
const SearchBar = () => {
   
    return (
        <SearchBarFrame>
            <SearchText>Search creative direction A24</SearchText>
            <SearchIcon>
                <SearchIconEllipseFrame>
                <SearchEllipseIcon/>
                </SearchIconEllipseFrame>
                <SearchIconHandleFrame>
                <SearchHandleIcon/>
                </SearchIconHandleFrame>
            </SearchIcon>
        </SearchBarFrame>
    );
};
  
export default SearchBar;