import React from 'react';
import styles from '../../../styles/PopupHelpers.module.css';

const Motif: React.FC = () => {
  return (
    <div className={styles.motifSection}>
      <div className={styles.motifHeader}>
        <img src="/assets/icons/motif.svg" />
        <h3>Motif</h3>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <select className={styles.selectDropDown} defaultValue='Signature de contrat'>
            <option disabled>Signature de contrat</option>
            <option>Type de signature #1</option>
            <option>Type de signature #2</option>
            <option>Type de signature #3</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <select className={styles.selectDropDown} defaultValue="Type d'abonnement">
            <option disabled>Type d'abonnement</option>
            <option>Type d'abonnement #1</option>
            <option>Type d'abonnement #2</option>
            <option>Type d'abonnement #3</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <input type='text' name='paid_amount' placeholder='Montant payé' />
        </div>
        <div className={styles.formGroup}>
          <input type='text' name='paid_amount' placeholder='Nbr de mois payés' />
        </div>
        <div className={styles.formGroup}>
          <select className={styles.selectDropDown} defaultValue='Méthode de paiement'>
            <option disabled>Méthode de paiement</option>
            <option>Méthode de paiement #1</option>
            <option>Méthode de paiement #2</option>
            <option>Méthode de paiement #3</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Motif