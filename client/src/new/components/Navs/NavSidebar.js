import React from 'react';
import { Link } from 'react-router-dom';

// Assets.
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { ReactComponent as TemplateIcon } from '../../assets/template.svg';
import { ReactComponent as ProfileIcon } from '../../assets/user.svg';
import { ReactComponent as MyLinkIcon } from '../../assets/broken-link.svg';

// Styles.
import styles from '../../styles/Navs/NavSidebar.module.scss';

const NavSidebar = () => {
  const logo = '/assets/svg/logo.svg';
  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} to="/dashboard">
        <img src={logo} alt={logo} />
      </Link>
      <div className={styles.navlist}>
        <Link className={styles.link} to="/dashboard/template">
          <TemplateIcon />
          <span>Template</span>
        </Link>
        <Link className={styles.link} to="/dashboard/profile">
          <ProfileIcon />
          <span>Profile</span>
        </Link>
        <Link className={styles.link} to="/dashboard/my-link">
          <MyLinkIcon />
          <span>My Link</span>
        </Link>
      </div>
      <Link className={styles.logout} to="/logout">
        <LogoutIcon />
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default NavSidebar;
