import {useEffect, useState} from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import {useAuthUser} from 'react-auth-kit'

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

const UsersContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
` 

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const auth = useAuthUser();

  useEffect(() => {
    
    const fetchData = async () => {
      const users = await axios.get(`${URL}/users`, {
        headers: {
          "x-access-token" : auth()?.token
        }
      });
      console.log(users);
      setUsers(users.data)    
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []) 

   
   


  const handleLogout = () => {
    signOut();
    navigate('/login');
  }
  


  return ( 

    <UsersContainer>

      <UserWrapper>
        <Button variant="warning" onClick={handleLogout}>Logout</Button>
      </UserWrapper> 

      <div>
          <div>{users?.map(user => <div key={user._id}>
              <UserWrapper>
                  <div>
                    <div>{user.email}</div>
                  </div>              
              </UserWrapper>  
          </div>
          )}</div>
      </div>
        
    </UsersContainer>  
  
  ) 

}

export default Users; 