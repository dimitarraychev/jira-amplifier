import React from 'react';

import logo from '../../assets/logo.png';
import jira from '../../assets/jira.png';
import './Popup.css';

import Toggle from '../../components/Toggle';
import { Actions } from '../../constants/actions';
import { StorageKeys } from '../../constants/storageKeys';

const Popup = () => {
  const title = 'Jira Amplifier';
  const version = '0.3.1 (Beta)';

  return (
    <div className="App">
      <header className="App-header">
        <img src={jira} alt="logo" />
        <img src={logo} alt="logo" />
        <h1>{title}</h1>
        <p className="subheading">Boost your productivity</p>
      </header>

      <Toggle
        label="Language Detection"
        storageKey={StorageKeys.languageDetection}
        enabledAction={Actions.enableLanguageDetection}
        disabledAction={Actions.disableLanguageDetection}
      />
      <Toggle
        label="Layer 2 Team Tags"
        storageKey={StorageKeys.layerTwoTags}
        enabledAction={Actions.enableLayerTwoTags}
        disabledAction={Actions.disableLayerTwoTags}
      />

      <footer className="App-footer">
        <a
          href="https://draychev.web.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Author
        </a>
        <p className="version">Version: {version}</p>
      </footer>
    </div>
  );
};

export default Popup;
