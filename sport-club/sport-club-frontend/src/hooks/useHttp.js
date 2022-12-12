import { useReducer, useCallback } from 'react';
const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  methodName: null,
  identifier: null
};
const BACKEND_URL='http://localhost:8081/'
const httpReducer = (curHttpState, action) => {
  console.log("REDUCER")
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
        methodName: action.methodName
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  console.log("USE HTTP")
  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(
    (url, method, body, userToken, methodName) => {
      dispatchHttp({ type: 'SEND', identifier: methodName });
      fetch(BACKEND_URL+url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          dispatchHttp({
            type: 'RESPONSE',
            responseData: responseData,
            extra: userToken,
            methodName: methodName
          });
        })
        .catch(error => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: error
          });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    userToken: httpState.extra,
    clear: clear,
    methodName: httpState.methodName
  };
};

export default useHttp;
