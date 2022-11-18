import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    try {
      // 요청 시작시 error, users 초기화
      setUsers(null);
      setError(null);
      // loading true로 변경
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error detected...</div>;
  if (!users) return <div>there're no data</div>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>redirect</button>
    </>
  );
}

export default Users;
