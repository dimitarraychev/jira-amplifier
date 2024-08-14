import React, { useEffect, useState } from 'react';

import './Toggle.css';

type toggleProps = {
  label: string;
  storageKey: string;
  enabledAction: string;
  disabledAction: string;
};

const Toggle = ({
  label,
  storageKey,
  enabledAction,
  disabledAction,
}: toggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(storageKey, (data) => {
      setIsChecked(data[storageKey] || false);
    });
  }, []);

  const onToggle = async () => {
    const newState = !isChecked;
    setIsChecked(newState);

    chrome.storage.local.set({ [storageKey]: newState });

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (!tab?.id) return;

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: newState ? enabledAction : disabledAction,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="switch-container">
      <p>{label}</p>

      <label className="switch">
        <input
          type="checkbox"
          id="detectLanguageToggle"
          checked={isChecked}
          onClick={onToggle}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;
