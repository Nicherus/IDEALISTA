import React, { useContext } from 'react';
import styled from 'styled-components';

import TaskModalContext from '../../contexts/TaskModal';

export default function Task ({ task }) {
  const { editTask } = useContext(TaskModalContext);

  return (
    <Card 
      onClick={() => editTask(task)}
      isChecked={task.isChecked}
      tabIndex="0"
    >
      { task.name }
    </Card>
  );
}

const Card = styled.button`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  color: black;
  margin: 0 0 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 0;
  text-align: left;
  text-decoration: ${({ isChecked }) => isChecked ? 'line-through' : 'none'};

  :hover {
    filter: brightness(0.9);
  }

  :last-child {
    margin: 0;
  }
`;
