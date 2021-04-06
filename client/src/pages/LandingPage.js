import React from 'react';

// Components.
import AuthForm from '../components/Forms/AuthForm';
import AuthModal from '../components/Modals/AuthModal';

const LandingPage = () => {
  return (
    <>
      <AuthModal>
        <AuthForm />
      </AuthModal>
      <div className="container">Landing Page</div>
    </>
  );
};

export default LandingPage;
