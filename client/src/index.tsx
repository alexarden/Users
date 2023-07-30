import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App'; 
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const auth: Boolean = false;

root.render(
  <React.StrictMode>
   {auth ?  <App /> : <Login/>}
  </React.StrictMode>
);

