import React from 'react';
import styles from '../../../styles/PopupHelpers.module.css';

const ClinicTop: React.FC = () => {
  return (
    <div className={styles.topSection}>
      <img src='/assets/image.svg#mask0_49_16' />
      <h1>Clinique Salam</h1>
      <div className={styles.historyButton}>
        <button>Historique</button>
      </div>
    </div>
  )
}

export default ClinicTop