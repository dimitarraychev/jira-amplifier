import { Actions } from '../../constants/actions';
import { StorageKeys } from '../../constants/storageKeys';
import {
  addLanguageTag,
  addLayerTwoTag,
  removeLanguageTags,
  removeLayerTwoTag,
} from '../../utils/dom';

let languageDetection = false;
let layerTwoTags = false;
let observer: MutationObserver | null = null;

const startObserver = () => {
  const container = document.body;

  if (observer) observer.disconnect();

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            if (languageDetection) {
              if (element.matches('.issue-link')) {
                addLanguageTag(element as HTMLElement);
              }

              // element.querySelectorAll('.issue-link').forEach((descendant) => {
              //   addLanguageTag(descendant as HTMLElement);
              // });
            }

            if (layerTwoTags) {
              if (element.matches('[id^="assignee"]')) {
                addLayerTwoTag(element as HTMLElement);
              }
            }
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!(request.action in Actions)) {
    sendResponse({ success: false });
    return true;
  }

  switch (request.action) {
    case Actions.enableLanguageDetection:
      languageDetection = true;
      detectLanguage();
      break;
    case Actions.disableLanguageDetection:
      languageDetection = false;
      detectLanguage();
      break;
    case Actions.enableLayerTwoTags:
      layerTwoTags = true;
      manageLayerTwoTags();
      break;
    case Actions.disableLayerTwoTags:
      layerTwoTags = false;
      manageLayerTwoTags();
      break;
  }

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

const manageLayerTwoTags = () => {
  const elements = document.querySelectorAll(
    '[id^="assignee"]'
  ) as NodeListOf<HTMLElement>;

  if (!layerTwoTags) {
    elements.forEach((element) => {
      removeLayerTwoTag(element);
    });
    return;
  }

  elements.forEach((element) => {
    addLayerTwoTag(element);
  });
};

const initialize = () => {
  chrome.storage.local.get(
    [StorageKeys.languageDetection, StorageKeys.layerTwoTags],
    (data) => {
      languageDetection = data[StorageKeys.languageDetection] || false;
      layerTwoTags = data[StorageKeys.layerTwoTags] || false;

      startObserver();
      handleDetection();
      manageLayerTwoTags();
    }
  );
};
initialize();
