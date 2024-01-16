import React from 'react';
import styles from '../../../styles/Popup.module.css';

const PopupFooter: React.FC = () => {
  return (
    <div className={styles.bottomSection}>
      <button className={styles.button}>
        Enregistrer
      </button>
      <div className={styles.visitsSection}>
        <a href='#'> &lt; Visite précédente</a>
        <a className={styles.disabledLink} href='#'> Visite suivante &gt; </a>
      </div>
    </div>
  )
}

export default PopupFooter