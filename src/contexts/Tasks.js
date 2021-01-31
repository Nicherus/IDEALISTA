import React, { createContext, useState } from 'react';
import axios from 'axios';

const TasksContext = createContext();
export default TasksContext;

export function TasksContextProvider (props) {
  const [tasks, setTasks] = useState([]);

  function updateTasks () {
    axios.get('http://localhost:3000/tasks').then(res => {
      setTasks(res.data);
    }).catch(error => {
      console.error(error);
      // alert('Não foi possível baixar listas! Verifique o console.');
    });
  }

  return (
    <TasksContext.Provider value = {{tasks, setTasks, updateTasks}}>
      { props.children }
    </TasksContext.Provider>
  );
}
