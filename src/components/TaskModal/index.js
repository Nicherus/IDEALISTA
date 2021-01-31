import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import TasksContext from '../../contexts/Tasks';
import TaskModalContext from '../../contexts/TaskModal';

import Label from './Label';

export default function TaskModal () {
  const { task, closeModal } = useContext(TaskModalContext);
  const { updateTasks } = useContext(TasksContext);
  const [labels, setLabels] = useState([]);
  
  const [taskLabels, setTaskLabels] = useState(task.labels);
  const [title, setTitle] = useState(task.name);
  const [editingTitle, setEditingTitle] = useState(false);
  const [description, setDescription] = useState(task.description || '');
  const [editingDescription, setEditingDescription] = useState(false);
  const [isChecked, setIsChecked] = useState(task.isChecked);

  useEffect(() => {
    updateLabels();
  }, []);

  function updateLabels () {
    axios.get('http://localhost:3000/labels').then(res => {
      setLabels(res.data);
    }).catch(error => {
      console.error(error);

      alert('Não foi possível obter as labels! Erro desconhecido!');
    });
  }

  function checkTitleKeyDown (event) {
    if (event.keyCode === 13) { // enter
      updateTaskTitle();
      setEditingTitle(false);
    } else if (event.keyCode === 27) { // esc
      setTitle(task.name);
      setEditingTitle(false);
    }
  }

  function checkDescriptionKeyDown (event) {
    if (event.keyCode === 13) { // enter
      updateTaskDescription();
      setEditingDescription(false);
    } else if (event.keyCode === 27) { // esc
      setDescription(task.description);
      setEditingDescription(false);
    }
  }

  function updateTaskTitle () {
    axios.put(`http://localhost:3000/tasks/${task.id}`, { name: title }).then(() => {
      task.name = title;
    }).catch(error => {
      console.error(error);

      setTitle(task.name);

      if (error.statusCode === 404) {
        alert('Não foi possível atualizar a tarefa! Tarefa não encontrada!');
      } else if (error.statusCode === 422) {
        alert('Não foi possível atualizar a tarefa! Dados inválidos!');
      } else {
        alert('Não foi possível atualizar a tarefa! Erro desconhecido!');
      }
    });
  }

  function updateTaskDescription () {
    axios.put(`http://localhost:3000/tasks/${task.id}`, { description }).then(() => {
      task.description = description;
    }).catch(error => {
      console.error(error);

      setDescription(task.description);

      if (error.statusCode === 404) {
        alert('Não foi possível atualizar a tarefa! Tarefa não encontrada!');
      } else if (error.statusCode === 422) {
        alert('Não foi possível atualizar a tarefa! Dados inválidos!');
      } else {
        alert('Não foi possível atualizar a tarefa! Erro desconhecido!');
      }
    });
  }

  function toggleTaskCheck () {
    axios.put(`http://localhost:3000/tasks/${task.id}`, { isChecked: !task.isChecked }).then(() => {
      task.isChecked = !task.isChecked;
      setIsChecked(task.isChecked);
    }).catch(error => {
      console.error(error);

      if (error.statusCode === 404) {
        alert('Não foi possível atualizar a tarefa! Tarefa não encontrada!');
      } else if (error.statusCode === 422) {
        alert('Não foi possível atualizar a tarefa! Dados inválidos!');
      } else {
        alert('Não foi possível atualizar a tarefa! Erro desconhecido!');
      }
    });
  }

  function deleteTask () {
    axios.delete(`http://localhost:3000/tasks/${task.id}`).then(() => {
      updateTasks();
      closeModal();
    }).catch(error => {
      console.error(error);

      if (error.statusCode === 404) {
        alert('Não foi possível atualizar a tarefa! Tarefa não encontrada!');
      } else {
        alert('Não foi possível atualizar a tarefa! Erro desconhecido!');
      }
    });
  }

  function addLabel () {
    let color = '';

    while(!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
      color = prompt('Digite a cor do novo label: ');
    }

    axios.post('http://localhost:3000/labels', { color }).then(() => {
      updateLabels();
    }).catch(error => {
      console.error(error);

      alert('Não foi possível adicionar label! Erro desconhecido!');
    })
  }

  function toggleLabel (labelId) {
    axios.post(`http://localhost:3000/tasks/${task.id}/labels/${labelId}`).then(res => {
      setTaskLabels(res.data);
    }).catch(error => {
      console.error(error);

      alert('Não foi possível atualizar associação da label na tarefa!');
    });
  }

  function close () {
    updateTasks();
    closeModal();
  }

  return (
    <Container>
      <Content>
        <Header>
          {
            editingTitle
              ? <Input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={checkTitleKeyDown} />
              : <Title tabIndex="0" onFocus={() => setEditingTitle(true)}>{ title }</Title>
          }
          <Close onClick={() => close()}>&times;</Close>
        </Header>
        <Grid>
          <Section>
            {
              editingDescription
                ? <Input autoFocus value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={checkDescriptionKeyDown} />
                : <Description tabIndex="0" onFocus={() => setEditingDescription(true)}>{ description || 'Sem descrição.' }</Description>
            }
          </Section>
          <Section noGrow>
            <Grid column>
              <Section>
                <Button onClick={() => toggleTaskCheck()}>{isChecked ? 'Iniciar tarefa' : 'Finalizar tarefa'}</Button>
              </Section>
              <Section>
                <Button onClick={() => deleteTask()}>Deletar tarefa</Button>
              </Section>
              <Section>
                <h1>Labels</h1>
                {
                  labels.map(label => (
                    <Label
                      key={label.id}
                      color={label.color}
                      active={Boolean(taskLabels.find(l => l.id === label.id))}
                      onClick={() => toggleLabel(label.id)}
                    />
                  ))
                }
                <Button onClick={() => addLabel()}>Adicionar Label</Button>
              </Section>
            </Grid>
          </Section>
        </Grid>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 1000px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 0;
`;

const Input = styled.input`
  padding: 10px 20px;
  font-size: 1.6rem;
  width: calc(100% - 40px);
`;

const Close = styled.button`
  font-size: 1.4rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  border: 0;
`;

const Grid = styled.section`
  display: flex;
  width: 100%;
  margin: 20px 0;

  ${({column}) => column ? 'flex-direction: column;' : ''}

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  flex-grow: ${({noGrow}) => noGrow ? '0' : '1'};

  h1 {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #DDD;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 0 10px;

  :hover {
    filter: brightness(0.9);
  }
`;

const Description = styled.article`
  font-size: 1.2rem;
  cursor: pointer;
`;
