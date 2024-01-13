import React from 'react';
import styles from '../styles/Popup.module.css';
import ClinicTop from './helpers/Popup/ClinicTop';
import Divider from './helpers/Divider';
import SignAndVIsitSection from './helpers/Popup/SignAndVIsitSection';
import Motif from './helpers/Popup/Motif';
import Responsable from './helpers/Popup/Responsable';
import Comment from './helpers/Popup/Comment';
import PopupFooter from './helpers/Popup/PopupFooter';

interface PopupProps {
  togglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ togglePopup }) => (
  <div className={styles.popup}>
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          <p>Rapport de la visite</p>
          <button className={styles.close} onClick={togglePopup}>X</button>
        </div>
        <div className={styles.popupBody}>
          <ClinicTop />
          <Divider />
          <div className={styles.scrollableBody}>
            <SignAndVIsitSection />
            <Motif />
            <Responsable />
            <Comment />
          </div>
          <PopupFooter />
        </div>
      </div>
    </div>
  </div>
)

export default Popup