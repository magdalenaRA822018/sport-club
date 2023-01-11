import { Row } from "../styled-components/Row";
import { Column } from "../styled-components/Column";
import Button from "../../components/styled/Buttons/Button";
import { WorkGroupDescription, WorkGroupIcon, WorkGroupText, WorkGroupTitle, WorkGroupFrame } from "./styled/styled-work-group-dropdown";
import { WorkGroupIconText, ChangeWorkGroupIcon } from "./styled/styled-work-group-dropdown";
import { VectorIcon } from "../styled-icons";

const WorkGroupDropdown = () => {
   
    return (
        <WorkGroupFrame>
            <WorkGroupIcon>
            <WorkGroupIconText>C</WorkGroupIconText>
            </WorkGroupIcon>
            <WorkGroupText>
                <WorkGroupTitle>Creative direction A24</WorkGroupTitle>
                <WorkGroupDescription>A24 Films</WorkGroupDescription>
            </WorkGroupText>
            <ChangeWorkGroupIcon  >
               <VectorIcon></VectorIcon>
            </ChangeWorkGroupIcon>
        </WorkGroupFrame>
    );
};
  
export default WorkGroupDropdown;