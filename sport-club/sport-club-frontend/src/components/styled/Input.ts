import styled from 'styled-components';
const Input = styled.input.attrs(props => ({
    // we can define static props
    type: props.type,
    size: props.size || "3em",
  }))`
    color: black;
    font-size: 1em;
    border: 1px solid #b1b5b2;
    border-radius: 5px;
    width: 100%;
    height: 2.5rem;
    padding: 1%;
    margin-bottom: 2%;
  `;
export default Input;