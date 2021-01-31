import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

import Task from './Task';
import TasksContext from '../../contexts/Tasks';

export default function List ({ list }) {
  const { updateTasks } = useContext(TasksContext);
  const { tasks } = list;

  function addTask () {
    const name = prompt('Digite o nome da task: ');

    axios.post('http://localhost:3000/tasks', { name }).then(() => {
      updateTasks();
    }).catch(error => {
      console.error(error);

      if (error.statusCode === 422) {
        alert('O nome da tarefa está num formato inválido! Não foi possível adicionar tarefa.');
      } else {
        alert('Não foi possível adicionar tarefa! Erro desconhecido.');
      }
    })
  }

  return (
    <Container>
      <Header>
        <Title>{ list.name }</Title>
      </Header>
      {
        tasks.map(task => <Task key={task.id} task={task} />)
      }
      <AddTaskButton onClick={() => addTask()}>
        <Add />
        <AddText>Adicionar Tarefa</AddText>
      </AddTaskButton>
    </Container>
  );
}

const Container = styled.section`
  background-color: rgba(0, 0, 0, .2);
  width: 100%;
  max-width: 480px;
  padding: 20px;
  margin: 10px;
  color: white;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const Header = styled.header`
  display: flex;
`;

const Add = styled(FaPlus)`
  margin: 0 10px 0 0;
`;

const AddText = styled.div`
  margin: 1px 0 0;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 0 0 20px;
`;

const AddTaskButton = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 5px;
  color: black;
  margin: 0 0 20px;
  cursor: pointer;
  border: 0;
  height: 56px;
  transition: all 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    filter: brightness(0.9);
  }

  :last-child {
    margin: 0;
  }
`;
