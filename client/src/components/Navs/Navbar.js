import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components.
import SimpleButton from '../Buttons/SimpleButton';

// Styles.
import styles from '../../styles/Navs/Navbar.module.scss';

const Navbar = ({ onLogin, onRegister }) => {
  const logo = '/assets/svg/logo.svg';
  return (
    <div className={styles.navbar}>
      <Container>
        <Row className={styles.navrow}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt={logo} />
            </Link>
          </div>
          <div className={styles.navlist}>
            <SimpleButton
              title="Login"
              className={`${styles.navlink} ${styles.login}`}
              onClick={onLogin}
            />
            <SimpleButton
              title="Register"
              className={`${styles.navlink} primary-button-color`}
              onClick={onRegister}
            />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
