import { Actions } from '../../constants/actions';
import { StorageKeys } from '../../constants/storageKeys';
import { addLanguageTag, removeLanguageTags } from '../../utils/dom';

let languageDetection = false;
let observer: MutationObserver | null = null;

const startObserver = () => {
  const container = document.body;

  if (observer) observer.disconnect();

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (!languageDetection) return;

            const element = node as Element;

            if (element.matches('.issue-link')) {
              addLanguageTag(element as HTMLElement);
            }

            element.querySelectorAll('.issue-link').forEach((descendant) => {
              addLanguageTag(descendant as HTMLElement);
            });
          }
        });
      }
    });
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
  });
};

const handleDetection = () => {
  const paragraphs = document.querySelectorAll(
    '.issue-link'
  ) as NodeListOf<HTMLElement>;

  if (paragraphs.length === 0) {
    console.log('No paragraphs found. Waiting for dynamic content...');

    setTimeout(detectLanguage, 1000);
  } else {
    detectLanguage();
  }
};

const initialize = () => {
  chrome.storage.local.get(StorageKeys.languageDetection, (data) => {
    languageDetection = data[StorageKeys.languageDetection] || false;

    startObserver();
    handleDetection();
  });
};
initialize();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!(request.action in Actions)) {
    sendResponse({ success: false });
    return true;
  }

  switch (request.action) {
    case Actions.enableLanguageDetection:
      languageDetection = true;
      break;
    case Actions.disableLanguageDetection:
      languageDetection = false;
      break;
  }

  detectLanguage();

  sendResponse({ success: true });
  return true;
});

const detectLanguage = () => {
  const paragraphs = document.querySelectorAll(
    '.issue-link'
  ) as NodeListOf<HTMLElement>;

  if (!languageDetection) {
    paragraphs.forEach((paragraph) => {
      removeLanguageTags(paragraph);
    });
    return;
  }

  paragraphs.forEach((paragraph) => {
    addLanguageTag(paragraph);
  });
};
