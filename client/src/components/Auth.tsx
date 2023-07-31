import axios from 'axios'
import {useAuthUser} from 'react-auth-kit'
import { Button } from 'react-bootstrap'

function Auth(){
  const auth = useAuthUser()
  const URL = process.env.REACT_APP_API_URL

  const handleIsAuth = async () => {
    const response = await axios.get(`${URL}/isAuth`, {
      headers: {
        // "x-access-token": 'sdfsad'
        "x-access-token": auth()?.token
      }
    })

    console.log(response);
    
  }

    return (
        <div style={{width: '80vw', wordWrap: 'break-word'}}>
            <div>Hello</div>
            <div>{JSON.stringify(auth())}</div>
            <Button variant="info" onClick={handleIsAuth}>isAuth</Button>
        </div>
    )


}

export {Auth} 