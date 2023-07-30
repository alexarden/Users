import {useEffect, useState} from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export type User = {
  _id: string,
  email: string,
  password: string,
  role: string
}

const UserWrapper = styled.div`
    border-bottom: 1px solid white;
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    button{
        margin: 5px 5px;
    }
` 

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

  const handleDelete = (id: string) => {
    // TODO add delete user if admin
    console.log('Deleted', id);
  }

  const handleEdit = (id: string) => {
    // TODO add edit user if admin 
    console.log('Edited', id); 
  }
  const handleAddUser = () => {
    // TODO add add user if admin 
    console.log('Add user'); 
  } 


  return ( 
    <div>
        <UserWrapper>
            <Button variant="success" onClick={handleAddUser}>Add User</Button>
            <Button variant="warning" onClick={handleLogout}>Logout</Button>
        </UserWrapper> 
        
        <div>
            <div>{users?.map(user => <div key={user._id}>
                <UserWrapper>
                    <div >{user.email}</div> 
                    <div>
                        <Button variant="light" onClick={() => handleEdit(user._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                    </div>                
                </UserWrapper>  
            </div>
            )}</div>
           
        </div>
        
    </div> 
   
  )

}

export default App; 