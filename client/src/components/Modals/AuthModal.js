import React from 'react';

// Styles.
import styles from '../../styles/Modals/AuthModal.module.scss';

const AuthModal = ({ children }) => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.behind} />
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default AuthModal;
