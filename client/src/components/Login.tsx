import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Login() { 
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        axios({
          method: 'post',
          url: 'http://localhost:5000/login',
          headers: {}, 
          data: {
            email: email, 
            password: password
          }
        }).then(res => console.log(res));
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