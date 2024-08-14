import React from 'react';

import logo from '../../assets/logo.png';
import jira from '../../assets/jira.png';
import './Popup.css';

import Toggle from '../../components/Toggle';
import { Actions } from '../../constants/actions';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={jira} alt="logo" />
        <img src={logo} alt="logo" />
        <h1>Jira Amplifier</h1>
      </header>

      <Toggle
        label="Language Detection"
        storageKey="ja_languageDetection"
        enabledAction={Actions[0]}
        disabledAction={Actions[1]}
      />
      <Toggle
        label="DXC Layer 2 Tags"
        storageKey="ja_languageDetection"
        enabledAction={Actions[0]}
        disabledAction={Actions[1]}
      />

      <footer className="App-footer">
        <p className="version">Version 0.1.3 (Beta)</p>
      </footer>
    </div>
  );
};

export default Popup;
