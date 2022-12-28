import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  margin: 1px;
  align-items: center;
  grid-area: content;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 1px;
`;

export const Col = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;