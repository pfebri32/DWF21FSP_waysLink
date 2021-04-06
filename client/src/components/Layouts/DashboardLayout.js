import React from 'react';
import { Link } from 'react-router-dom';

// Styles.
import styles from '../../styles/Layouts/DashboardLayout.module.scss';

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div>LOGO</div>
        <div className={styles.links}>
          <Link to="/dashboard/template">Template</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/my-link">My Link</Link>
        </div>
        <div className={styles.footer}>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>Header</div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
