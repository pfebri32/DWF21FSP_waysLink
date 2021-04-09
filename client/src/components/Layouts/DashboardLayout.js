import React from 'react';

// Components.
import NavSidebar from '../Navs/NavSidebar';

// Styles.
import styles from '../../styles/Layouts/DashboardLayout.module.scss';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex flex-fill">
      <NavSidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
