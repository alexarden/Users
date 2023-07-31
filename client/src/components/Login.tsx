import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/user';


function Login() { 
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = useSignIn();
    const dispatch = useDispatch();
   
    const URL = process.env.REACT_APP_API_URL


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try{
        const response = await axios({
          method: 'post',
          url: `${URL}/login`,
          headers: {},   
          data: {
            email: email, 
            password: password
          }
        })

        if(response.status === 200){
          console.log(response.data); 
          dispatch(setUser(response.data.result))

          signIn({ 
            token: response.data.token,
            expiresIn: response.data.expire, 
            tokenType: 'Bearer',
            authState: response.data.result
          })

          navigate('/')
        }

    
        
      }catch(error: any){
        console.log(error.message)
        console.log(error.response.data)
      }
      
    }
     
  return  (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" type="submit" > 
        Submit
      </Button>
    </Form>
  );
}

export default Login