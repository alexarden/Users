import {useEffect, useState} from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';

export type User = {
  _id: string,
  email: string,
  password: string,
  role: string
}

function App() {
  const [users, setUsers] = useState<User[] | null>()
  const signOut = useSignOut()
  const navigate = useNavigate() 

  useEffect(()=> {
    const url = 'http://127.0.0.1:5000/users'; 
    axios.get(url).then(response => setUsers(response.data))
  })


  const handleLogout = () => {
    signOut();
    navigate('/login');
  }

  return (
    <div>
        <Button variant="warning" onClick={handleLogout}>Logout</Button>
        <div>{users?.map(user => <div key={user._id}>{user.email}</div>)}</div>
    </div>
   
  )

}

export default App; 