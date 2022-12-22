import styled from 'styled-components';
const Button = styled.button`
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  height: 2.5rem;
  width: 100%;
  background: #27273b;
  border: 1px solid #27273b;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  }
`;
export default Button;