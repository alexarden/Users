import {useEffect, useState} from 'react'; 
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
    const url = 'http://127.0.0.1:5000/users'; 
    axios.get(url).then(response => setUsers(response.data))
  })
  return (
   <div>{users?.map(user => <div key={user._id}>{user.email}</div>)}</div>
  )
}

export default App; 