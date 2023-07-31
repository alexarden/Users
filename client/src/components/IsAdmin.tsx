import Users from './Users';
import AdminUsers from './AdminUsers';
import { useSelector } from 'react-redux';

function IsAdmin(){
    const { user } = useSelector((state: any) => state.user);
    const isAdmin = user.role === 'admin' ? true : false;
 
    return (<>
        {isAdmin ? <AdminUsers/> : <Users/>} 
    </>) 

    // return (<div>{user.role}</div>) 

};

export default IsAdmin;