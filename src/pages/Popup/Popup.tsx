import React from 'react';

import logo from '../../assets/logo.png';
import jira from '../../assets/jira.png';
import './Popup.css';

import Toggle from '../../components/Toggle';
import { Actions } from '../../constants/actions';
import { StorageKeys } from '../../constants/storageKeys';

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
        storageKey={StorageKeys.languageDetection}
        enabledAction={Actions.enableLanguageDetection}
        disabledAction={Actions.disableLanguageDetection}
      />
      <Toggle
        label="DXC Layer 2 Tags"
        storageKey={StorageKeys.layerTwoTags}
        enabledAction={Actions.enableLayerTwoTags}
        disabledAction={Actions.disableLayerTwoTags}
      />

      <footer className="App-footer">
        <p className="version">Version 0.1.3 (Beta)</p>
      </footer>
    </div>
  );
};

export default Popup;
