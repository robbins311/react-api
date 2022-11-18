import axios from "axios";
import React from "react";
import useAsync from "./useAsync";

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  console.log(id, response);
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;
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
