import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'; 
import App from './App'; 
import Login from './components/Login'
import Container from 'react-bootstrap/Container';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const auth: Boolean = false;

root.render(
  <React.StrictMode>
    <div className='align-center'>
    <Container> 
   {auth ?  <App /> : <Login/>}
   </Container>
   </div>
  </React.StrictMode>
);

