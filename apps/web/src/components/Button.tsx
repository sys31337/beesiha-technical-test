import React from 'react';
import styles from '../styles/Popup.module.css';

interface ButtonProps {
  togglePopup: () => void;
}

const Button: React.FC<ButtonProps> = ({ togglePopup }) => (
  <button className={styles.button} onClick={togglePopup}>
    Open Popup
  </button>
);

export default Button