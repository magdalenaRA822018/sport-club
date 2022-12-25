import styled from 'styled-components';
import Button from './Button';

export const SubmitFormButton = styled(Button)<{valid: boolean}>`
    background-color: ${props => props.valid ? `green` : `red`}; 
`;
