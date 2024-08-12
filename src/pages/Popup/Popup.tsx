import React from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import Toggle from '../../components/Toggle';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jira Amplifier</h1>
      </header>
      <Toggle label="Language Detection" />
    </div>
  );
};

export default Popup;
