import styled from "styled-components";
import { colors } from "../colors";
import { Row } from "../styled-components/Row";
import { robotoItalic } from "../fonts";
export const SearchBarFrame = styled.input`
    box-sizing: border-box;
    position: absolute;
    border: 3px solid ${colors.wildSand};
    background: ${colors.wildSand};
    border-radius: 8px;
    height: 35px;
    width: 800px;
`;
export const SearchBar = styled.input`
    width: 179px;
    height: 16px;
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: ${colors.wildSand};
`;

