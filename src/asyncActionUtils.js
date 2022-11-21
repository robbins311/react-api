// 이 함수는 파라미터로 액션의 타입 (예: GET_USER) 과 Promise 를 만들어주는 함수를 받아옴.
export default function createAsyncDispatcher(type, promisFn) {
  // 성공, 실패에 대한 액션타입 문자열
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  // new function, ...rest를 사용하여 나머지 파라미터를 rest 배열에 담음
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type }); // 요청시작
    try {
      const data = await promisFn(...rest); // rest 배열은 spread로
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
