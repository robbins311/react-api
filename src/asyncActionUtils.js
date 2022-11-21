// 이 함수는 파라미터로 액션의 타입 (예: GET_USER) 과 Promise 를 만들어주는 함수를 받아옴.
export default function createAsyncDispatcher(type, promiseFn) {
  // 성공, 실패에 대한 액션타입 문자열
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  // new function, ...rest를 사용하여 나머지 파라미터를 rest 배열에 담음
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type }); // 요청시작
    try {
      const data = await promiseFn(...rest); // rest 배열은 spread로
      dispatch({
        type: SUCCESS,
        data,
      }); // 성공
    } catch (error) {
      dispatch({
        type: ERROR,
        error: error,
      });
    }
  }
  return actionHandler;
}

// reducer
export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
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

// 세가지 액션 리듀서, type = 액션타입, rey는 리듀서 필드네임 ex :(user, users)
export function createAsyncHandler(type, key) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // 함수를 새로 만들어서
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
      default:
        return state;
    }
  }

  // 반환합니다
  return handler;
}
