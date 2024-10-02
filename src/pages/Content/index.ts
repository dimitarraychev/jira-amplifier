import { Actions } from '../../constants/actions';
import { StorageKeys } from '../../constants/storageKeys';
import {
  addLanguageTag,
  addLayerTwoTag,
  removeLanguageTag,
  removeLayerTwoTag,
  waitForElementsThenExecute,
} from '../../utils/dom';

let languageDetection = false;
let layerTwoTags = false;
let bannerRemoval = false;
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
              if (element.matches('[id^="reporter"]')) {
                addLanguageTag(element as HTMLElement);
              }

              element
                .querySelectorAll('[id^="reporter"]')
                .forEach((descendant) => {
                  addLanguageTag(descendant as HTMLElement);
                });
            }

            if (layerTwoTags) {
              if (element.matches('[id^="assignee"]')) {
                addLayerTwoTag(element as HTMLElement);
              }

              element
                .querySelectorAll('[id^="assignee"]')
                .forEach((descendant) => {
                  addLayerTwoTag(descendant as HTMLElement);
                });
            }

            if (bannerRemoval) {
              if (element.matches('#announcement-banner')) {
                toggleBannerRemoval;
              }

              element
                .querySelectorAll('#announcement-banner')
                .forEach((descendant) => {
                  toggleBannerRemoval;
                });
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!(request.action in Actions)) {
    sendResponse({ success: false });
    return true;
  }

  switch (request.action) {
    case Actions.enableLanguageDetection:
      languageDetection = true;
      toggleLanguageDetection();
      break;
    case Actions.disableLanguageDetection:
      languageDetection = false;
      toggleLanguageDetection();
      break;
    case Actions.enableLayerTwoTags:
      layerTwoTags = true;
      toggleLayerTwoTags();
      break;
    case Actions.disableLayerTwoTags:
      layerTwoTags = false;
      toggleLayerTwoTags();
      break;
    case Actions.removeBanner:
      bannerRemoval = true;
      toggleBannerRemoval();
      break;
    case Actions.showBanner:
      bannerRemoval = false;
      toggleBannerRemoval();
      break;
  }

  sendResponse({ success: true });
  return true;
});

const toggleLanguageDetection = () => {
  const elements = document.querySelectorAll(
    '[id^="reporter"]'
  ) as NodeListOf<HTMLElement>;

  if (!languageDetection) {
    elements.forEach((element) => {
      removeLanguageTag(element);
    });
    return;
  }

  elements.forEach((element) => {
    addLanguageTag(element);
  });
};

const toggleLayerTwoTags = () => {
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

const toggleBannerRemoval = () => {
  const banner = document.getElementById('announcement-banner') as HTMLElement;
  if (!bannerRemoval) return;

  banner.remove();
};

const initialize = () => {
  chrome.storage.local.get(
    [
      StorageKeys.languageDetection,
      StorageKeys.layerTwoTags,
      StorageKeys.bannerRemoval,
    ],
    (data) => {
      languageDetection = data[StorageKeys.languageDetection] || false;
      layerTwoTags = data[StorageKeys.layerTwoTags] || false;
      bannerRemoval = data[StorageKeys.bannerRemoval] || false;

      startObserver();
      waitForElementsThenExecute('[id^="reporter"]', toggleLanguageDetection);
      waitForElementsThenExecute('[id^="assignee"]', toggleLayerTwoTags);
      waitForElementsThenExecute('#announcement-banner', toggleBannerRemoval);
    }
  );
};
initialize();
