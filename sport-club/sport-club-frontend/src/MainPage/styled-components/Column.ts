import styled from "styled-components";
import { colors } from "../colors";

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MainPage = styled(Column)`

`;

export const MainMenuBar = styled(Column)`
    align-items: flex-start;
    padding: 30px 0px;
    gap: 30px;
    width: 289px;
    height: 782px;
    top: 122px;
    background: ${colors.sanJuan};
`;

export const ChatContainer = styled(Column)`
    height: 121px;
    width: 290px;
    left: 289px;
    right: 290px;
    top: 783px;
    background: ${colors.white};
`;

export const ToolsBar = styled(Column)`
    width: 290px;
    background: ${colors.athensGray};
    box-shadow: -2px 1px 16px rgba(0, 0, 0, 0.35);
`;

export const ThreadMenuItems = styled(Column)`
    align-items: flex-start;
    gap: 5px;
    width: 288px;
    height: 131px;
`;

