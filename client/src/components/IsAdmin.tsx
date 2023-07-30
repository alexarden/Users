import Users from './Users';
import AdminUsers from './AdminUsers';
import { useSelector } from 'react-redux';



function IsAdmin(){
    const { user } = useSelector((state: any) => state.user)
    const isAdmin = false;

    // return (<>
    //     {isAdmin ? <AdminUsers/> : <Users/>} 
    // </>)

    return (<div>{user.email}</div>) 

};

export default IsAdmin;