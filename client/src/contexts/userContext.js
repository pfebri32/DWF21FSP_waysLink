import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const init = {
  isLogin: false,
  user: null,
};

const reducer = (state, action) => {
  const { type, payloads } = action;

  switch (type) {
    case 'UPDATE':
      return {
        ...state,
        user: {
          ...state.user,
          name: payloads.name,
        },
      };
    case 'VALID':
    case 'LOGIN':
      localStorage.setItem('token', payloads.token);
      return {
        isLogin: true,
        user: payloads.user,
      };
    case 'INVALID':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        isLogin: false,
        user: null,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
