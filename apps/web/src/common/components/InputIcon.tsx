import React from 'react';
import styles from './styles.module.css';


interface InputIconProps {
  iconPath: string;
  inputName: string;
  placeHolder: string;
  defaultValue?: string;
  inputType?: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'
}

const InputIcon: React.FC<InputIconProps> = ({ iconPath, inputName, placeHolder, defaultValue, inputType, ...rest }) => {
  return (
    <div className={styles.iconInput}>
      <div className={styles.iconWrapper}>
        <img src={iconPath} alt={inputName} />
      </div>
      <input type={inputType || 'text'} name={inputName} placeholder={placeHolder || ''} value={defaultValue} {...rest} />
    </div>
  )
}

export default InputIcon