import styled from "styled-components";
import { gilroyBold24, robotoRegular40014,robotoBold16 } from "../../fonts";
import { colors } from "../../colors";
import { Column } from "../../styled-components/Column";
import { Row } from "../../styled-components/Row";


export const WorkGroupFrame = styled(Row)`
    margin-left: 28.82px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const WorkGroupIcon = styled.div`
    box-sizing: border-box;
    background: ${colors.amethyst};
    border: 2px solid ${colors.white};
    border-radius: 8px;
    width: 45px;
    height: 45px;
`;

export const WorkGroupIconText = styled(gilroyBold24)`
    padding-left: 12px;
    padding-top: 6px;
    color: ${colors.white};
`;

export const WorkGroupText = styled(Column)`
   
`;

export const WorkGroupTitle = styled(robotoBold16)`
    margin-left: 15px;
    color: ${colors.white};
`;

export const WorkGroupDescription = styled(robotoRegular40014)`
    margin-left: 15px;
    color: ${colors.white};
`;

export const ChangeWorkGroupIcon = styled.div`
    margin-left: 15px;
    width: 13.64px;
    transform: rotate(-90deg);

`;