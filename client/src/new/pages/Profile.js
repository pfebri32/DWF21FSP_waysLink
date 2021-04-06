import React from 'react';

// Components.
import ProfileForm from '../components/Forms/ProfileForm';
import DashboardHeader from '../components/Headers/DashboardHeader';

// Styles.
import styles from '../styles/Pages/Profile.module.scss';

const Profile = () => {
  return (
    <>
      <DashboardHeader title="My Account" />
      <div className="dashboard-container">
        <div className={styles.container}>
          <div className={styles.header}>My Information</div>
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

export default Profile;
