import React, { createContext, useContext, useReducer } from "react";
import createAsyncDispatcher from "./asyncActionUtils";
import * as api from "./api";

const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

// loading object
const loadingState = {
  loading: true,
  data: null,
  error: null,
};
// data object
const success = (data) => ({
  loading: false,
  data,
  error: null,
});
// error object
const error = (error) => ({
  loading: false,
  data: null,
  error,
});

// reducer
function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: loadingState,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: success(action.data),
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        users: success(action.error),
      };
    case "GET_USER":
      return {
        ...state,
        user: loadingState,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: error(action.error),
      };

    default:
      throw new Error(`unHandeld action type: ${action.type}`);
  }
}
// state용 context, dispatch용 context
const usersStateContext = createContext(null);
const usersDispatchContext = createContext(null);

//위의 선언한 context들을 provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <usersStateContext.Provider value={state}>
      <usersDispatchContext.Provider value={dispatch}>
        {children}
      </usersDispatchContext.Provider>
    </usersStateContext.Provider>
  );
}

// state를 쉽게 조회할 수 있게 해주는 커스텀 hook
export function useUsersState() {
  const state = useContext(usersStateContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

// state를 쉽게 조회할 수 있게 해주는 커스텀 hook
export function useUsersDispatch() {
  const dispatch = useContext(usersDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}

// API 처리 함수
export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);

/* export async function getUsers(dispatch) {
  dispatch({ type: "GET_USERS" });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({ type: "GET_USERS_SUCCESS", data: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_ERROR", error: error });
  }
}
export async function getUser(dispatch, id) {
  dispatch({ type: "GET_USER" });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({ type: "GET_USER_SUCCESS", data: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ERROR", error: error });
  }
} */

function UsersCotnext() {
  return <div></div>;
}

export default UsersCotnext;
