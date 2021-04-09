import React from 'react';

// Components.
import InputTextA from '../Inputs/InputTextA';

// Styles.
import styles from '../../styles/Forms/LinkForm.module.scss';

const LinkForm = ({
  className,
  title,
  link,
  onChange,
  index,
  img,
  isChange,
  local,
}) => {
  const defaultImage = '/assets/img/default.jpg';
  const getImage = () => {
    if (!img) {
      return defaultImage;
    }

    if (local || isChange) {
      return URL.createObjectURL(img);
    }

    return img;
  };
  return (
    <div className={`${styles.form} ${className}`}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <label className={styles.image}>
            <img src={getImage()} alt="preview" />
            <input
              name="img"
              type="file"
              data-index={index}
              onChange={onChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className={styles.fields}>
          <InputTextA
            label="Title Link"
            placeholder="ex. Your Title Link"
            data-index={index}
            value={title}
            name="title"
            type="text"
            onChange={onChange}
          />
          <InputTextA
            label="Link"
            placeholder="ex. Your Link"
            value={link}
            data-index={index}
            name="link"
            type="text"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
