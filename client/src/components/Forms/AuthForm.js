import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Contexts.
import { UserContext } from '../../contexts/userContext';

// Configs.
import { API, setAuthToken } from '../../config/api';

// Styles.
import styles from '../../styles/Forms/AuthForm.module.scss';

const AuthForm = () => {
  // Contexts.
  const [state, dispatch] = useContext(UserContext);

  // States.
  const [hasAccount, setHasAccount] = useState(true);
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
  });

  // Vars.
  const history = useHistory();

  // Handlers.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (hasAccount) {
        const body = JSON.stringify({
          email: form.email,
          password: form.password,
        });
        res = await API.post('/login', body, config);
      } else {
        const body = JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
        });
        res = await API.post('/register', body, config);
      }

      const { data } = res.data;

      dispatch({
        type: 'LOGIN',
        payloads: {
          token: data.token,
          user: data.user,
        },
      });
      setAuthToken(data.token);
      history.push('/dashboard/template');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.formArea}>
      <div className={styles.header}>{hasAccount ? 'Login' : 'Register'}</div>
      <form onSubmit={handleSubmit}>
        <div>
          {!hasAccount && (
            <div className={styles.group}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>
          )}
          <div className={styles.group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className={styles.submit} type="submit">
          {hasAccount ? 'Login' : 'Register'}
        </button>
      </form>
      <Link
        className={styles.switch}
        onClick={() => setHasAccount((prev) => !prev)}
      >
        {hasAccount ? "Don't" : 'Already'} have an account ?{' '}
        <span>Click Here</span>
      </Link>
    </div>
  );
};

export default AuthForm;
