import axios from 'axios'
import {useAuthUser} from 'react-auth-kit'
import { Button } from 'react-bootstrap'

function Auth(){
  const auth = useAuthUser();

  const URL = process.env.REACT_APP_API_URL;

  const handleIsAuth = async () => {
    try{
      const response = await axios({
        method: 'post',
        url: `${URL}/isAuth`,
        headers: {
          "x-access-token": auth()?.token
        },   
        data: {
          role: auth()?.role
        }
       
      })
  
      console.log(response);
    }catch(err:any){
      console.log(err.message)
      console.log(err.response.data)
    }
   
    
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