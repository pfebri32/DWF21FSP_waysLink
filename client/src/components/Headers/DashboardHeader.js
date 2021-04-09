import React from 'react';

// Styles.
import styles from '../../styles/Headers/DashboardHeader.module.scss';

const DashboardHeader = ({ title }) => {
  return <div className={styles.header}>{title}</div>;
};

export default DashboardHeader;
