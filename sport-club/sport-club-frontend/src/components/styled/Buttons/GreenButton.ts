import styled from 'styled-components';
const GreenButton = styled.button`
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  height: 2.5rem;
  width: 100%;
  background: #07725f;
  border: 1px solid #07725f;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1%;
  &:hover {
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  }
`;
export default GreenButton;  