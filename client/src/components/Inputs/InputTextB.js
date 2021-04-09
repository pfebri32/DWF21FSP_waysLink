import React from 'react';

// Styles.
import styles from '../../styles/Inputs/InputTextB.module.scss';

const InputTextB = ({ name, value, type, onChange, className, label }) => {
  return (
    <div className={`${styles.input} ${className}`}>
      <label className={value && styles.focus}>{label}</label>
      <input type={type} name={name} onChange={onChange} />
    </div>
  );
};

export default InputTextB;
