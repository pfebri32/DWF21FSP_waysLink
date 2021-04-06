import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Contexts.
import { UserContext } from '../contexts/userContext';

// Configs.
import { API } from '../config/api';

// Styles.
import styles from '../styles/Pages/ProfilePage.module.scss';

const ProfilePage = () => {
  // Contexts.
  const [state, dispatch] = useContext(UserContext);

  // States.
  const [form, setForm] = useState({
    name: state.user.name,
    email: state.user.email,
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

  const handleUpdate = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ name: form.name });
      await API.patch('/user', body, config);
      dispatch({
        type: 'UPDATE',
        payloads: { name: form.name },
      });
    } catch (error) {
      console.log(error);
    }
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
  return (
    <>
      <div className={styles.header}>My Information</div>
      <form className={styles.form}>
        <div>
          <div className={styles.group}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <label>Email</label>
            <input type="text" disabled value={form.email} />
          </div>
        </div>
        <div className={styles.buttons}>
          <div
            className={`${styles.button} ${styles.update}`}
            onClick={handleUpdate}
          >
            Save Account
          </div>
          <div
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
          >
            Delete Account
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
