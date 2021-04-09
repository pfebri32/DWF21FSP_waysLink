import React from 'react';

// Styles.
import styles from '../../../styles/Pages/Templates/Views/TemplateA.module.scss';

const TemplateA = ({ title, description, img, links }) => {
  // Render.
  const renderLinks = () =>
    links.map(({ link, img, title, id }) => (
      <a href={link} className={styles.link} key={id}>
        <div className={styles.row}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <img src={img} alt={img} />
            </div>
          </div>
          <div className={styles.linkTitle}>{title}</div>
        </div>
      </a>
    ));
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={img} alt={img} />
            </div>
          </div>
          <div className={styles.title}>{title}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
        <div>{renderLinks()}</div>
      </div>
    </>
  );
};

export default TemplateA;
