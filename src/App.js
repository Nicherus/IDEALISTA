import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import GlobalStyle from './assets/styles/globals';
import Dashboard from './pages/Dashboard';
import { TasksContextProvider } from './contexts/Tasks';
import { TaskModalContextProvider } from './contexts/TaskModal';

export default function List () {
  return (
    <>
      <GlobalStyle />
      <TasksContextProvider>
        <TaskModalContextProvider>
          <Router>
            <Switch>
              <Route path='/'>
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </TaskModalContextProvider>
      </TasksContextProvider>
    </>
  );
}
