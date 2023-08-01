import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {useAuthUser} from 'react-auth-kit'
import styled from "styled-components";
import { response } from "express";
 

const Input = styled.input<{ $inputColor?: string; }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#4be04b"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
const FormStatus = styled.div<{ $textColor?: string; }>`
    color: ${props => props.$textColor || "#ffffff00"};
    margin: 0 auto;
    width: fit-content;
    font-size: 2rem;
`

function AdminForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Test');
    const [textColor, setTextColor] = useState('#ffffff00')
    const auth = useAuthUser();
 
    const URL = process.env.REACT_APP_API_URL

    const handleSubmit =async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({
            email: email,
            password: password,
            role: role
        });

        try{
            const response = await axios({
                method: 'post',
                url: `${URL}/add`,
                headers: {
                    "x-access-token": auth()?.token
                },   
                data: {
                  user:{ email: email, 
                  password: password,
                  role: role
                  },
                  role: auth()?.role

                }
              })

              if(response.status === 201){
                setStatus(response.statusText)
                setTextColor("#4be04b")
              }
    
        }catch(err: any){
            console.log(err.message)
            console.log(err.response.data);
            setStatus(err.response.data.message)
            setTextColor('#cf3e3e')
        }
        
        
    }


    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Check 
            required
            name={'role'}
            type={'radio'}
            id={'adminRadio'}
            label={'Admin'}
            onClick={() => setRole('admin')}
             />

            <Form.Check 
            required
            name={'role'}
            type={'radio'}
            id={'userRadio'}
            label={'User'}
            onClick={() => setRole('user')}
             /> 


            <Button variant="primary" type="submit" >
                Submit
            </Button>

            <FormStatus $textColor={textColor}>{status}</FormStatus> 
        </Form>
        )

}

export {AdminForm}