import * as process from 'process';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
window.global = window;
window.process = process;
window.Buffer = [];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
