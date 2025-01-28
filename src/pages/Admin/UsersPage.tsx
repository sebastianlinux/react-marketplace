import Navbar from "components/Navbar";
import UsersList from "components/Users/UsersList";
import { useEffect, useState } from "react";
import APIService from "services/Api";
import { User } from "types";



const AdminUsersPage = () => {

  const [users, setUsers] = useState<User[]>([])
  const fetchUsers = async() => {
    const res = await APIService.getUsers()
    console.log('respuesta users',res)
    setUsers(res)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <div>
      <Navbar />
      <div>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
