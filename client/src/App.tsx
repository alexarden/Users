import { Route, Routes } from 'react-router-dom';
import './App.scss'; 
import Login from './components/Login';
import IsAdmin from './components/IsAdmin'
import { RequireAuth } from 'react-auth-kit';
import ErrorPage from './components/ErrorPage';
import { Auth } from './components/Auth';

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
          <RequireAuth loginPath={'/login'}><IsAdmin/></RequireAuth>}>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/*' element={<ErrorPage/>}></Route>
      </Routes>
  )
}

export default App;
