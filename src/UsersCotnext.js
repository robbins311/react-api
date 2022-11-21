import React, { createContext, useContext, useReducer } from "react";
import createAsyncDispatcher from "./asyncActionUtils";
import * as api from "./api";
import { createAsyncHandler, initialAsyncState } from "./asyncActionUtils";

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

// reducer
function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);
    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);

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
