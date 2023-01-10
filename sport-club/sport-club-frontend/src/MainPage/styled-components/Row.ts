import styled from "styled-components";
import { gilroyBold14, robotoRegular14 } from "../fonts";
import { colors } from "../colors";
export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HeaderBar = styled(Row)`
    background: ${colors.valentino};
    height: 75px;
`;

export const SecondaryHeaderBar = styled(Row)`
    background: ${colors.bostonBlue};
    height: 47px;
`;

export const BottomContainer = styled(Row)`
  
`;

export const SelectorFrame = styled(Row)`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 28px;
  gap: 61px;
  width: 201.64px;
  height: 17px;

`;

export const SelectorTitleFrame = styled(gilroyBold14)`
  width: 99px;
  height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.455em;
  color: ${colors.white};
`;

export const ThreadMenuItem = styled(Row)`
  padding: 5px 28px;
  gap: 12px;
  width: 288px;
  height: 29px;
`;