import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// Contexts.
import { UserContext } from '../contexts/userContext';

const Logout = () => {
  const [state, dispatch] = useContext(UserContext);
  dispatch({ type: 'LOGOUT' });
  return <Redirect to="/" />;
};

export default Logout;
