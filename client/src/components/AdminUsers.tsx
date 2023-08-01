import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useAuthUser } from "react-auth-kit";
import { AdminAddForm } from "./AdminAddForm";
import { AdminEditForm } from "./AdminEditForm";

export type User = {
  _id: string;
  email: string;
  password: string;
  role: string;
};

const UserWrapper = styled.div`
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  button {
    margin: 5px 5px;
  }
`;

const UsersContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState({});
  const [addFormDisplay, setAddFormDisplay] = useState("none");
  const [addEditDisplay, setEditFormDisplay] = useState("none");
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [clicked, setClicked] = useState<User[]>([]);

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${URL}/users`;
    axios
      .get(url, {
        headers: {
          "x-access-token": auth()?.token,
        },
      })
      .then((response) => setUsers(response.data));
  }, []);

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${URL}/delete`,
        headers: {
          "x-access-token": auth()?.token,
        },
        data: {
          role: auth()?.role,
          userId: id,
        },
      });

      if (response) {
        const url = `${URL}/users`;
        axios
          .get(url, {
            headers: {
              "x-access-token": auth()?.token,
            },
          })
          .then((response) => setUsers(response.data));
      }

      console.log(response);
    } catch (err: any) {
      console.log(err.message);
      console.log(err.response.data);
    }
  };

  const handleEdit = (id: string) => {
    // TODO add edit user if admin
    console.log("Edited", id);
    let user = users.filter((f) => f._id === id)[0];
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setEditFormDisplay("block");
  };

  const handleAddUser = () => {
    // TODO add add user if admin
    console.log(addFormDisplay);
    setAddFormDisplay("block");
  };

  const setUsersProp = () => {
    const url = `${URL}/users`;
    axios
      .get(url, {
        headers: {
          "x-access-token": auth()?.token,
        },
      })
      .then((response) => setUsers(response.data));
  };

  return (
    <UsersContainer>
      <AdminAddForm
        formDisplay={addFormDisplay}
        setFormDisplay={setAddFormDisplay}
        users={users}
        setUsers={setUsersProp}
      />
      <AdminEditForm
        formDisplay={addEditDisplay}
        setFormDisplay={setEditFormDisplay}
        user={user}
        setUsers={setUsersProp}
      />
      <UserWrapper>
        <Button variant="success" onClick={handleAddUser}>
          Add User
        </Button>
        <Button variant="warning" onClick={handleLogout}>
          Logout
        </Button>
      </UserWrapper>

      <div>
        <div>
          {users?.map((user) => (
            <div key={user._id}>
              <UserWrapper>
                <div>
                  <div>{user.email}</div>
                  <div>{user.role}</div>
                </div>
                <div>
                  <Button variant="light" onClick={() => handleEdit(user._id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </UserWrapper>
            </div>
          ))}
        </div>
      </div>
    </UsersContainer>
  );
}

export default AdminUsers;
