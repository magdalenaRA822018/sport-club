import styled from "styled-components";
import { colors } from "../colors";
export const UserProfileAndOptionsFrame = styled.div`
    margin-left: 483px;
    padding-top: 13px;
    position: relative;
`;
export const UserImage = styled.div<{url: string}>`
    position: absolute;
    background-image: '../../images/fudbaler.jpg';// ${props => props.url}; 
    border: 2px solid ${colors.gallery};
    width: 49px;
    height: 49px;
`;

export const ActivityStatus = styled.div`
    position: absolute;
    left: 66.1%;
    right: 0%;
    top: 4.08%;
    bottom: 55.1%;
    background: ${colors.malachite};
   
`;