import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// Styles.
import styles from '../../styles/Heroes/HeroHome.module.scss';
import SimpleButton from '../Buttons/SimpleButton';

const HeroHome = ({ onStarted }) => {
  const phoneImage = '/assets/img/phone.png';
  const pcImage = '/assets/img/pc.png';
  return (
    <div className={styles.hero}>
      <div className={styles.elementA} />
      <div className={styles.elementB} />
      <div className={styles.elementRoundA} />
      <div className={styles.elementRoundB} />
      <Container className="d-flex flex-column flex-fill justify-content-center">
        <Row>
          <Col className={styles.left}>
            <div className={styles.title}>The Only Link You’ll Ever Need</div>
            <div className={styles.description}>
              <p>
                Add a link for your Social Bio and optimize your social media
                traffic.
              </p>
              <p>Safe, fast and easy to use.</p>
            </div>
            <SimpleButton
              className={styles.button}
              title="Get Started For Free"
              onClick={onStarted}
            />
          </Col>
          <Col className={styles.right}>
            <div className={styles.heroImage}>
              <img className={styles.pcImage} src={pcImage} alt={pcImage} />
              <img
                className={styles.phoneImage}
                src={phoneImage}
                alt={phoneImage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroHome;
