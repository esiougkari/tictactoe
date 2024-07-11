import React from 'react';
import './WinnerPopup.css';

const WinnerPopup = ({ winner, onClose }) => {
  return (
    <div className="winner-popup">
      <div className="winner-content">
        <h2>{winner} wins!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WinnerPopup;
