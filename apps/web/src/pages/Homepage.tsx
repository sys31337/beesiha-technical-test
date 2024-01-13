import React, { useState } from 'react';
import Button from '../components/Button';
import Popup from '../components/Popup';

const Homepage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const togglePopup = () => {
    setIsOpen((curr) => !curr);
  }
  return (
    <>
      <Button togglePopup={togglePopup} />

      {isOpen && (
        <Popup togglePopup={togglePopup} />
      )}

    </>
  )
}

export default Homepage