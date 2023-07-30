import { Route, Routes } from 'react-router-dom';
import './App.scss'; 
import Login from './components/Login';
import Users from './components/Users';
import { RequireAuth } from 'react-auth-kit';
import ErrorPage from './components/ErrorPage';

export type User = {
  _id: string,
  email: string,
  password: string,
  role: string
}

function App() {
 
  return (
    
      <Routes>
        <Route path='/' element={
          <RequireAuth loginPath={'/login'}><Users/></RequireAuth>}>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>
      </Routes>
  )
}

export default App;
