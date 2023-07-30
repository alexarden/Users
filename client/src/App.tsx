import { Route, Routes } from 'react-router-dom';
import './App.scss'; 
import Login from './components/Login';
import Users from './components/Users';
import { RequireAuth } from 'react-auth-kit';

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
      </Routes>
  )
}

export default App;
