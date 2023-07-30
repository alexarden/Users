import {useEffect, useState} from 'react'; 
import './App.css';
import axios from 'axios';

export type User = {
  _id: string,
  email: string,
  password: string,
  role: string
}

function App() {
  const [users, setUsers] = useState<User[] | null>()
  useEffect(()=> {
    const url = 'http://localhost:5000/users'; 
    axios.get(url).then(response => setUsers(response.data))
  })
  return (
    <div className='App'>
     {users ? users.map((user) => <div>{user.email}</div>) : null}
    </div>
  )
}

export default App;
