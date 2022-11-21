import React, { useState } from "react";
import User from "./User";
import { getUsers, useUsersDispatch, useUsersState } from "./UsersCotnext";

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const { loading, data: users, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };
  if (loading) return <div>loading...</div>;
  if (error) return <div>error detected...</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;
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
      <button onClick={fetchData}>redirect</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
