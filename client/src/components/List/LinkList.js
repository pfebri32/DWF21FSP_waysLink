import React from 'react';
import { Link } from 'react-router-dom';

// Assets.
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

// Styles.
import styles from '../../styles/List/LinkList.module.scss';

const LinkList = ({ title, link, img, views, className, onDelete, id }) => {
  const defaultImage = '/assets/img/default.jpg';
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <img src={img ? img : defaultImage} alt="default" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div
            className={styles.link}
          >{`http://localhost:3000/view/${link}`}</div>
        </div>
        <div className={styles.views}>
          {views}
          <span>Visit</span>
        </div>
        <div className={styles.action}>
          <Link to={`/view/${link}`}>
            <EyeIcon />
          </Link>
          <Link to={`/dashboard/template/edit/${id}`}>
            <EditIcon />
          </Link>
          <div onClick={onDelete}>
            <TrashIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkList;
