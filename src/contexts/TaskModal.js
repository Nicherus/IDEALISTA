import React, { createContext, useState } from 'react';
import Modal from 'react-modal';

import TaskModal from '../components/TaskModal';

const TaskModalContext = createContext();
export default TaskModalContext;

Modal.setAppElement('#root');

export function TaskModalContextProvider (props) {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState();

  function editTask (task) {
    setTask(task);
    setShowModal(true);
  }

  function closeModal () {
    setShowModal(false);
  }

  return (
    <TaskModalContext.Provider value = {{task, editTask, closeModal}}>
      <Modal
        isOpen={showModal}
        style={customStyles}
      >
        <TaskModal task={task} />
      </Modal>
      { props.children }
    </TaskModalContext.Provider>
  );
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: '0'
  }
};
