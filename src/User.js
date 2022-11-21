// import axios from "axios";
import React, { useEffect } from "react";
// import useAsync from "./useAsync";
import { getUser, useUsersDispatch, useUsersState } from "./UsersCotnext";

/* async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  console.log(id, response);
  return response.data;
} */

function User({ id }) {
  // const [state] = useAsync(() => getUser(id), [id]);
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);
  const { loading, data: user, error } = state.user;
  if (loading) return <div>loading...</div>;
  if (error) return <div>error detected...</div>;
  if (!user) return <div>there're no data</div>;
  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
