import React, { useContext, useState } from 'react';

// Contexts.
import { UserContext } from '../../contexts/userContext';

// Components.
import InputTextB from '../Inputs/InputTextB';
import SimpleButton from '../Buttons/SimpleButton';

// Configs.
import { API, setAuthToken } from '../../config/api';

// Styles.
import styles from '../../styles/Forms/AuthForm.module.scss';

const AuthForm = ({ hasAccount, onSwitch }) => {
  // Vars.
  const title = hasAccount ? 'Login' : 'Register';

  // Contexts.
  // eslint-disable-next-line
  const [state, dispatch] = useContext(UserContext);

  // Form states.
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

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
      let res, body;
      const config = { headers: { 'Content-Type': 'application/json' } };

      if (hasAccount) {
        body = JSON.stringify({
          email: form.email,
          password: form.password,
        });
        res = await API.post('/login', body, config);
      } else {
        body = JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
        });
        res = await API.post('/register', body, config);
      }

      const { user, token } = res.data.data;
      dispatch({
        type: 'LOGIN',
        payloads: {
          token,
          user,
        },
      });
      setAuthToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  // Renders.
  const renderSwitch = hasAccount ? (
    <>
      Don't have an account ? <span>Click Here.</span>
    </>
  ) : (
    <>
      Already have an account ? <span>Click Here.</span>
    </>
  );
  return (
    <div className={styles.container}>
      <div className={`${styles.header} primary-text-color`}>{title}</div>
      <form onSubmit={handleSubmit}>
        <div>
          {!hasAccount && (
            <InputTextB
              className={styles.group}
              name="name"
              type="text"
              label="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          )}
          <InputTextB
            className={styles.group}
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
          />
          <InputTextB
            className={styles.group}
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ display: 'none' }} />
        <SimpleButton
          className={`${styles.submit} primary-button-color`}
          title={title}
          onClick={handleSubmit}
        />
        <div className={styles.switch} onClick={onSwitch}>
          {renderSwitch}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
