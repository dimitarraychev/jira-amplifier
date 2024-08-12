import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import jira from '../../assets/jira.png';
import './Popup.css';
import Toggle from '../../components/Toggle';

const Popup = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('ja_languageDetection', (data) => {
      setIsEnabled(data.ja_languageDetection || false);
    });
  }, []);

  const toggleLanguageDetection = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    chrome.storage.local.set({ ja_languageDetection: newState });

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (!tab?.id) return;

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: newState
          ? 'enableLanguageDetection'
          : 'disableLanguageDetection',
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={jira} alt="logo" />
        <img src={logo} alt="logo" />
        <h1>Jira Amplifier</h1>
      </header>
      <Toggle label="Language Detection" onClick={toggleLanguageDetection} />
    </div>
  );
};

export default Popup;
