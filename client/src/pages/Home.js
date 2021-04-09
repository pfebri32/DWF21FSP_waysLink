import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Redirect } from 'react-router';

// Contexts.
import { UserContext } from '../contexts/userContext';

// Components.
import Navbar from '../components/Navs/Navbar';
import HeroHome from '../components/Heroes/HeroHome';
import AuthForm from '../components/Forms/AuthForm';

// Styles.
import authFormStyles from '../styles/Forms/AuthForm.module.scss';

const Home = () => {
  // Contexts.
  const [state] = useContext(UserContext);

  // Auth form.
  const [hasAccount, setHasAccount] = useState(false);
  const [show, setShow] = useState(false);

  // Handlers.
  const handleToggle = (targetShow, targetHasAccount) => {
    setHasAccount(targetHasAccount);
    setShow(targetShow);
  };
  return (
    <>
      {!state.isLogin ? (
        <div className="d-flex flex-column flex-fill">
          <Modal
            contentClassName={authFormStyles.modalContent}
            dialogClassName={authFormStyles.modalDialog}
            show={show}
            onHide={() => {
              setShow(false);
            }}
          >
            <AuthForm
              hasAccount={hasAccount}
              onSwitch={() => setHasAccount((prev) => !prev)}
            />
          </Modal>
          <Navbar
            onLogin={() => handleToggle(true, true)}
            onRegister={() => handleToggle(true, false)}
          />
          <HeroHome onStarted={() => handleToggle(true, true)} />
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
};

export default Home;
