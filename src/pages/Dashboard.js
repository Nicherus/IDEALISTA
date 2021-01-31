import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import TasksContext from '../contexts/Tasks';
import List from '../components/List';

export default function Dashboard () {
  const {tasks, updateTasks} = useContext(TasksContext);

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <>
      <Navbar>Idealista - Yet Another Todo List</Navbar>
      <Container>
        <List list={{
          name: 'Tarefas',
          tasks
        }} />
      </Container>
    </>
  );
}

const Navbar = styled.nav`
  background-color: rgba(20, 20, 20, 0.8);
  height: 56px;
  font-size: 1.6rem;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 56px);
  padding: 20px;
  overflow-x: auto;
  overflow-y: hidden;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
