import Users from './Users';
import AdminUsers from './AdminUsers';
import { useSelector } from 'react-redux';
import {useAuthUser} from 'react-auth-kit'

function IsAdmin(){
    const auth = useAuthUser()
    
    const isAdmin = auth()?.role === 'admin' ? true : false;
 
    return (<>
        {isAdmin ? <AdminUsers/> : <Users/>} 
    </>) 

    // return (<div>{user.role}</div>) 

};

export default IsAdmin;