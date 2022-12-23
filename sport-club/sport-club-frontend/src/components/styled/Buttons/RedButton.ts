import styled from 'styled-components';
const RedButton = styled.button`
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  height: 2.5rem;
  width: 100%;
  background: #c34c5a;
  border: 1px solid #c34c5a;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1%;
  &:hover {
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  }
`;
export default RedButton;