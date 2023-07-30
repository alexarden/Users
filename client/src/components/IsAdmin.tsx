import Users from './Users';
import AdminUsers from './AdminUsers';

function IsAdmin(){
    const isAdmin = false;

    return (<>
        {isAdmin ? <AdminUsers/> : <Users/>} 
    </>)

};

export default IsAdmin;