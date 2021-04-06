import React from 'react';
import { Link } from 'react-router-dom';

// styles.
import styles from '../../styles/Buttons/SimpleButton.module.scss';

const SimpleButton = ({ title, link, className, ...rest }) => {
  return link ? (
    <Link className={`${styles.button} ${className}`} {...rest}>
      {title}
    </Link>
  ) : (
    <div className={`${styles.button} ${className}`} {...rest}>
      {title}
    </div>
  );
};

export default SimpleButton;
