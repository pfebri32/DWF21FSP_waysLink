import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

// Contexts.
import { UserContext } from '../../contexts/userContext';

// Components.
import InputTextA from '../Inputs/InputTextA';
import SimpleButton from '../Buttons/SimpleButton';

// Configs.
import { API } from '../../config/api';

// Styles.
import styles from '../../styles/Forms/ProfileForm.module.scss';

const ProfileForm = () => {
  // Vars.
  const history = useHistory();

  // Contexts.
  const [state, dispatch] = useContext(UserContext);
  const { user } = state;

  // Form states.
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
  });

  // Handlers.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      await API.delete('/user');
      dispatch({ type: 'LOGOUT' });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ name: form.name });
      await API.patch('/user', body, config);
      dispatch({
        type: 'UPDATE',
        payloads: { name: form.name },
      });
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <InputTextA
        label="Name"
        value={form.name}
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />
      <InputTextA
        label="Email"
        value={form.email}
        name="email"
        placeholder="Email"
        disabled
      />
      <div className={styles.buttons}>
        <SimpleButton
          title="Save Account"
          className={`${styles.button} primary-button-color`}
          onClick={handleUpdate}
        />
        <SimpleButton
          title="Delete Account"
          className={`${styles.button} danger-button-color`}
          onClick={handleDelete}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
