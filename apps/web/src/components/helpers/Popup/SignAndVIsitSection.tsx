import React from 'react';
import styles from '../../../styles/PopupHelpers.module.css';

const SignAndVIsitSection: React.FC = () => {
  return (
    <div className={styles.signAndVisitSection}>
      <p className={styles.signedLabel}>Signé</p>
      <p className={styles.visitDate}>Visitée le 22 Août 2022 | 14:30</p>
    </div>
  )
}

export default SignAndVIsitSection