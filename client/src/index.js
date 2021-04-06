import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Demo.
import AppDemo from './AppDemo';

// Contexts.
import { UserContextProvider } from './contexts/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <AppDemo />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
