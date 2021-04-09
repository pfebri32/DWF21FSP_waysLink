import React from 'react';

// Styles.
import styles from '../../styles/Inputs/InputTextA.module.scss';

const InputTextA = ({
  onChange,
  placeholder,
  value,
  className,
  label,
  name,
  type,
  disabled,
  ...rest
}) => {
  return (
    <div className={`${styles.group} ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default InputTextA;
