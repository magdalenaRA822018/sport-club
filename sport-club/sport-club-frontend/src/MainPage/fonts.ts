import styled from "styled-components";
import { Row } from "./styled-components/Row";


export const robotoRegular = styled.div`
    font-family: 'Roboto-Regular';
    font-style: normal;
`;

export const robotoBold = styled.div`
    font-family: 'Roboto-Bold';
    font-style: normal;
`;

export const robotoItalic = styled.div`
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;

export const robotoThreads = styled(robotoRegular)`
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
`;


export const robotoRegular14 = styled(robotoRegular)`
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.455em;
`;



//itemi u main meniju: hover
/*export const robotoRegular16 = styled(robotoRegular)`
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
`;
*/


export const gilroyBold = styled(Row)`
    font-family: 'Gilroy-Bold';
    font-style: normal;
`;

//font za naslove u main meniju
export const gilroyBold14 = styled(gilroyBold)`
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.455em;
`;
//font za sales&marketing
export const gilroyBold12 = styled(gilroyBold)`
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.455em;
`;