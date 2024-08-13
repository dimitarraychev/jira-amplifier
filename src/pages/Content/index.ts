console.log('content script works with ts');

import { franc } from 'franc-min';
import { Actions } from '../../constants/actions';

let languageDetection = false;
let tableObserver: MutationObserver;

// Function to initialize and start observing the table
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
              styleParagraph(element as HTMLElement);
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

// Initialize language detection and observer based on stored value
chrome.storage.local.get('ja_languageDetection', (data) => {
  languageDetection = data.ja_languageDetection || false;

  // Start observing the table regardless of language detection being on or off
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

  // Trigger language detection immediately after toggling the setting
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
      removeLangTags(paragraph);
    });
    return;
  }

  paragraphs.forEach((paragraph) => {
    styleParagraph(paragraph);
  });
};

const styleParagraph = (paragraph: HTMLElement) => {
  const text = paragraph.textContent;
  const ticketNumRegex = /^[A-Z]{3,5}-\d{6}$/;

  if (!text || ticketNumRegex.test(text)) return;

  removeLangTags(paragraph);

  const language = franc(text, { only: ['eng', 'deu'], minLength: 5 });

  const langTag = document.createElement('span');
  langTag.textContent = `[${language.toUpperCase()}]`;
  langTag.style.color = `${language === 'deu' ? '#ff3b30' : '#34c759'}`;

  paragraph.insertBefore(langTag, paragraph.firstChild);
};

const removeLangTags = (paragraph: HTMLElement) => {
  const spans = paragraph.querySelectorAll('span');
  spans.forEach((span) => {
    if (span.textContent && span.textContent.startsWith('[')) {
      paragraph.removeChild(span);
    }
  });
};
