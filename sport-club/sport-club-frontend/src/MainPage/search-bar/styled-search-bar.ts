import styled from "styled-components";
import { colors } from "../colors";
import { Row } from "../styled-components/Row";

export const robotoItalic = styled.div`
    font-family: 'Roboto-Italic';
    font-weight: 700;
    font-size: 14px;
    line-height: 16.41px;
`;

export const SearchBarFrame = styled(Row)`
    box-sizing: border-box;
    border: 3px solid ${colors.wildSand};
    background: ${colors.wildSand};
    border-radius: 8px;
    height: 35px;
    width: 800px;
    margin-left: 295.18px;
    margin-top: 20px;
   
   
`;

export const SearchText = styled(robotoItalic)`
    margin-top: 8px;
    margin-left: 15px;
    color: ${colors.boulder};
    width: 734px;
`;

export const SearchIcon = styled.div`
    width: 48px;
    height: 30px;
    background: ${colors.bostonBlue};
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    
    position: relative;
`;
export const SearchIconEllipseFrame = styled.div`
    position: absolute;
    margin-left: 14px;
  
`;

export const SearchIconHandleFrame = styled.div`
    position: absolute;
    margin-left: 25px;
    margin-top: 7.7px;
`;