import React, { useState, useEffect } from 'react';

import logo from '../../assets/logo.png';
import jira from '../../assets/jira.png';
import './Popup.css';

import Toggle from '../../components/Toggle';

const Popup = () => {
  const [isLanguageDetectionEnabled, setIsLanguageDetectionEnabled] =
    useState(false);

  useEffect(() => {
    chrome.storage.local.get('ja_languageDetection', (data) => {
      setIsLanguageDetectionEnabled(data.ja_languageDetection || false);
    });
  }, []);

  const toggleLanguageDetection = async () => {
    const newState = !isLanguageDetectionEnabled;
    setIsLanguageDetectionEnabled(newState);

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
      <Toggle
        label="Language Detection"
        checked={isLanguageDetectionEnabled}
        onClick={toggleLanguageDetection}
      />
      <p className="version">Version 0.1.2 (Beta)</p>
    </div>
  );
};

export default Popup;
