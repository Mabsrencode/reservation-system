import { React, useEffect, useState } from "react";
import UsersDetails from "../components/UsersDetails";
const AdminDashboard = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/api/users/");
      const json = await response.json();
      if (response.ok) {
        setUsers(json);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="dashboard">
      <div className="users">
        {users && users.map((user) => (
          <UsersDetails key={user._id} user={user}/>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
