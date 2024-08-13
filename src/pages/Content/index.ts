console.log('content script works with ts');

import { franc } from 'franc-min';

let languageDetection = false;
let tableObserver = new MutationObserver(() => {});

chrome.storage.local.get('ja_languageDetection', (data) => {
  languageDetection = data.ja_languageDetection || false;

  if (languageDetection) {
    detectLanguage();
    observeNewParagraphs();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const actions = ['enableLanguageDetection', 'disableLanguageDetection'];
  if (!actions.includes(request.action)) {
    sendResponse({ success: false });
    return true;
  }

  if (request.action === actions[0]) {
    languageDetection = true;
    observeNewParagraphs();
  } else if (request.action === actions[1]) {
    languageDetection = false;
    tableObserver.disconnect();
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
    paragraphs.forEach((paragraph) => (paragraph.style.color = '#6e6e6e'));
    return;
  }

  paragraphs.forEach((paragraph) => styleParagraph(paragraph));
};

const styleParagraph = (paragraph: HTMLElement) => {
  const text = paragraph.textContent;
  if (!text || text.startsWith('ITSM')) return;

  const language = franc(text, { only: ['eng', 'deu'], minLength: 5 });
  if (!language) return;

  paragraph.style.color = `${language === 'deu' ? '#6e6e6e' : '#34c759'}`;
};

const observeNewParagraphs = () => {
  const tableContainer = document.querySelector('.queue-react-table-container');

  if (!tableContainer) {
    console.warn('Target div not found. MutationObserver not initialized.');
    return;
  }

  const tableObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            if (element.matches('.issue-link')) {
              styleParagraph(element as HTMLParagraphElement);
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
