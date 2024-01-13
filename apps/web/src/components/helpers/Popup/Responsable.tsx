import React from 'react';
import styles from '../../../styles/PopupHelpers.module.css';
import InputIcon from '../../../common/components/InputIcon';

const Responsable: React.FC = () => {
  return (
    <div className={styles.responsableSection}>
      <div className={styles.responsableHeader}>
        <img src="/assets/icons/responsable.svg" />
        <h3>Responsable</h3>
      </div>

      <div className={styles.resform}>
        <div className={styles.resformGroup}>
          <input type='text' name='firstname' placeholder='Nom' defaultValue='DJOUADI' />
        </div>
        <div className={styles.resformGroup}>
          <input type='text' name='lastname' placeholder='Prénom' defaultValue='Nadia' />
        </div>
        <div className={styles.resformGroup}>
          <InputIcon
            iconPath='/assets/icons/phone.svg'
            inputName='phone'
            placeHolder='Numéro de téléphone'
            inputType='text'
          />
        </div>
        <div className={styles.resformGroup}>
          <InputIcon
            iconPath='/assets/icons/email.svg'
            inputName='email'
            placeHolder='nomprénom@mail.com'
            inputType='email'
          />
        </div>
        <div className={styles.resformGroup}>
          <div className={styles.radio}>
            <label>
              <input type="radio" name="radio" value="option1" defaultChecked={true} />
              <span>Homme</span>
            </label>
          </div>
          <div className={styles.radio}>
            <label>
              <input type="radio" name="radio" value="option2" />
              <span>Femme</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Responsable