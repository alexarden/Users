import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthUser } from 'react-auth-kit'
import styled from "styled-components";


const FormStatus = styled.div<{ $textColor?: string; }>`
    color: ${props => props.$textColor || "#ffffff"};
    margin: 0 auto;
    width: fit-content;
    font-size: 1.6rem;
`

const FormContainer = styled.div<{ $display?: string; }>`
    display: ${props => props.$display};
    margin-bottom: 25px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
function AdminEditForm(props: any) {

    let userPros = props.user; 
    let setUsers = props.setUsers; 
    let formDisplay = props.formDisplay;
    let setFormDisplay = props.setFormDisplay;

    const [user, setUser] = useState<any>({}); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('Test');
    const [textColor, setTextColor] = useState('#ffffff00');
    const auth = useAuthUser();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")!)
        console.log('user ', user); 
        if(user){
           setEmail(user.email)
           setPassword(user.password)
           setRole(user.role)
           setId(user._id)
        }
        
    },[]) 

    const statusRef = useRef(status);
    statusRef.current = status;
   
    const statusTimeout = () => {
      setTimeout(() => {
        setStatus('');
      }, 2000); 
    };


    const URL = process.env.REACT_APP_API_URL

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        console.log({
            id: id, 
            email: email,
            password: password,
            role: role
        });

        try {
            const response = await axios({
                method: 'post',
                url: `${URL}/update`,
                headers: {
                    "x-access-token": auth()?.token
                },
                data: {
                    user: {
                        id:id,
                        email: email,
                        password: password,
                        role: role
                    },
                    role: auth()?.role

                }
            })

            if (response.status) {
                setStatus(response.statusText)
                setTextColor("#4be04b")
                const url = `${URL}/users`; 
                axios.get(url, {
                  headers: {
                    "x-access-token": auth()?.token
                  }
                }).then(response => setUsers(response.data)) 
                statusTimeout() 
            }



        } catch (err: any) {
            console.log(err.message)
            console.log(err.response.data);
            setStatus(err.response.data.message)
            setTextColor('#cf3e3e')
            statusTimeout() 
        }


    }

    const handleHide = () => {
        console.log(formDisplay);
        setFormDisplay('none')
    }


    return (

        <FormContainer $display={formDisplay}>

    
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label> 
                    <Form.Control required type="text" placeholder={password} value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Check
                    required
                    name={'role'}
                    type={'radio'}
                    label={'Admin'}
                    onClick={() => setRole('admin')}
                />

                <Form.Check
                    required
                    name={'role'}
                    type={'radio'}
                    label={'User'}
                    onClick={() => setRole('user')}
                />

                <ButtonWrapper>
                    <Button variant="primary" type="submit" >
                        Edit 
                    </Button>
                    <FormStatus $textColor={textColor}>{status}</FormStatus>
                    <Button variant="secondary" type="button" onClick={handleHide} >
                        Hide
                    </Button>
                </ButtonWrapper>

                
            </Form>
        </FormContainer>
    )

}

export { AdminEditForm }