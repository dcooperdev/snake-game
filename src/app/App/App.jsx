import React from 'react';
import { Router } from "react-router-dom";
import { ContextProvider } from '../context/provider';
import { RouterApp } from '../routes';
import BeforeUnloadPage from '../components/BeforeUnloadPage/BeforeUnloadPage';
import UserConfigBar from '../components/UserConfigBar/UserConfigBar';
import history from '../utils/history';
import './index.css';

const App = () => {
  return (
    <ContextProvider>
      <BeforeUnloadPage />
      <Router history={history}>
        <UserConfigBar />
        <RouterApp />
      </Router>
    </ContextProvider>
  )
}

export default App;
