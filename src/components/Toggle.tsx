import React from 'react';
import { MouseEventHandler } from 'react';

import './Toggle.css';

type toggleProps = {
  label: string;
  onClick?: MouseEventHandler;
};

const Toggle = ({ label, onClick }: toggleProps) => {
  return (
    <div className="switch-container">
      <p>{label}</p>

      <label className="switch">
        <input type="checkbox" id="detectLanguageToggle" onClick={onClick} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;
