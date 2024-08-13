import { Actions } from '../../constants/actions';
import { addLanguageTag, removeLanguageTags } from '../../utils/dom';

let languageDetection = false;
let tableObserver: MutationObserver;

const startObserver = () => {
  const tableContainer = document.querySelector('.queue-react-table-container');
  if (!tableContainer) {
    console.warn('Target div not found. MutationObserver not initialized.');
    return;
  }

  tableObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.matches('.issue-link')) {
              addLanguageTag(element as HTMLElement);
            }
          }
        });
      }
    });
  });

  tableObserver.observe(tableContainer, {
    childList: true,
    subtree: true,
  });
};

chrome.storage.local.get('ja_languageDetection', (data) => {
  languageDetection = data.ja_languageDetection || false;

  startObserver();

  if (languageDetection) {
    detectLanguage();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!(request.action in Actions)) {
    sendResponse({ success: false });
    return true;
  }

  if (request.action === Actions[0]) {
    languageDetection = true;
  } else if (request.action === Actions[1]) {
    languageDetection = false;
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
