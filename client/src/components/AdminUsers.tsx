import {useEffect, useState} from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {useAuthUser} from 'react-auth-kit'
import { AdminForm } from './AdminForm';

export type User = {
  _id: string,
  email: string,
  password: string,
  role: string
};

const UserWrapper = styled.div`
    border-bottom: 1px solid white;
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    button{
        margin: 5px 5px;
    }
` ;

const UsersContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
` ;

function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [fresher, setFresher] = useState(false)
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const URL = process.env.REACT_APP_API_URL; 

  useEffect(()=> { 
    const url = `${URL}/users`; 
    axios.get(url, {
      headers: {
        "x-access-token": auth()?.token
      }
    }).then(response => setUsers(response.data))
  }, []);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleDelete = async (id: string) => {
    try{
      const response = await axios({
        method: 'delete',
        url: `${URL}/delete`,
        headers: {
          "x-access-token": auth()?.token
        },   
        data: {
          role: auth()?.role,
          userId : id
        }
       
      })

      if(response){
        setFresher(!fresher)
      }
  
      console.log(response); 
    }catch(err:any){
      console.log(err.message) 
      console.log(err.response.data)
    }
  };

  const handleEdit = (id: string) => {
    // TODO add edit user if admin 
    console.log('Edited', id); 
  };

  const handleAddUser = () => {
    // TODO add add user if admin 
    console.log('Add user'); 
  };


  return ( 
    <UsersContainer>

        <AdminForm/>
        <UserWrapper>
            <Button variant="success" onClick={handleAddUser}>Add User</Button>
            <Button variant="warning" onClick={handleLogout}>Logout</Button>
        </UserWrapper>  
        
        <div>
            <div>{users?.map(user => <div key={user._id}>
                <UserWrapper>
                    <div>
                      <div>{user.email}</div>
                      <div>{user.role}</div>  
                      
                    </div> 
                    <div>
                        <Button variant="light" onClick={() => handleEdit(user._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                    </div>                
                </UserWrapper>  
            </div>
            )}</div>
           
        </div>
    </UsersContainer>  
   
  )

};

export default AdminUsers; 