import axios from "axios";
import React, { useState } from "react";
import { useAsync } from "react-async";
import ReactAsyncUser from "./ReactAsyncUser";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(response);
  return response.data;
}

function ReactAsyncUsers() {
  const [userId, setUserId] = useState(null);
  const {
    data: users,
    error,
    isLoading,
    run,
  } = useAsync({
    deferFn: getUsers,
  });
  console.log(isLoading);
  console.log(users);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error detected...</div>;
  console.log(users);
  if (!users) return <button onClick={run}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={run}>다시 불러오기</button>
      {userId && <ReactAsyncUser id={userId} />}
    </>
  );
}

export default ReactAsyncUsers;
