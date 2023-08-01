import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import Container from 'react-bootstrap/Container';
import { AuthProvider } from 'react-auth-kit';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppContainer = styled.div`
  display : flex;
  align-items: center;
  height: 100vh;
  background-color: #212529;
  color: white;
`


root.render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      // IMPORTANT enable cookie secure when done.
      cookieSecure={false}
    >
      <AppContainer>
        <Container>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </Container>
      </AppContainer>
    </AuthProvider>
  </React.StrictMode>
);

