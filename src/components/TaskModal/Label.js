import React from 'react';
import styled from 'styled-components';

export default function Label ({ color, active, onClick }) {
  return (
    <Box active={active} onClick={onClick}>
      <StyledLabel color={color} />
    </Box>
  );
}

const Box = styled.button`
  background-color: ${({active}) => active ? '#EEE' : '#FFF'};
  border: ${({active}) => active ? '1px solid #CCC' : 'none'};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`;

const StyledLabel = styled.div`
  background-color: ${({color}) => color};
  border-radius: 5px;
  padding: 10px 40px;
`;
