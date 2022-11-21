import React, { useState } from "react";
/* import axios from "axios";
import useAsync from "./useAsync"; */
import User from "./User";
import { getUsers, useUsersDispatch, useUsersState } from "./UsersCotnext";

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었음.
/* async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
} */

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const { loading, data: users, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };
  /* console.log(userId);
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, data: users, error } = state; // state.data를 users 키워드로 조회 */
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
