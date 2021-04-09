import React from 'react';

// Components.
import SimpleButton from '../Buttons/SimpleButton';

// Styles.
import styles from '../../styles/Forms/SearchBar.module.scss';

const SearchBar = ({
  onChange,
  onSearch,
  className,
  name,
  value,
  placeholder,
}) => {
  const searchIcon = '/assets/svg/search.svg';
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.search}>
        <img src={searchIcon} alt={searchIcon} />
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <SimpleButton
        title="Search"
        className={`${styles.button} primary-button-color`}
        onClick={onSearch}
      />
    </div>
  );
};

export default SearchBar;
