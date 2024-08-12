import { franc } from 'franc-min';

console.log('Content script works!');

let languageDetection = false;

chrome.storage.local.get('ja_languageDetection', (data) => {
  languageDetection = data.ja_languageDetection || false;
  console.log('lang detection: ', languageDetection);

  // if (languageDetection) {
  // 	detectLanguage();
  // 	observeNewParagraphs(); // Start observing for new paragraphs
  // }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  if (request.action === 'enableLanguageDetection') {
    languageDetection = true;
    console.log('lang detection change: ', languageDetection);

    // detectLanguage();
    // observeNewParagraphs();
  } else if (request.action === 'disableLanguageDetection') {
    languageDetection = false;
    console.log('lang detection change: ', languageDetection);

    // observer.disconnect(); // Stop observing the DOM
  }

  sendResponse({ success: true });
  return true;
});

// function detectLanguage() {
// 	if (!languageDetection) return;

// 	const paragraphs = document.querySelectorAll(".issue-link");

// 	paragraphs.forEach((paragraph) => {
// 		const text = paragraph.textContent;
// 		if (text) {
// 			const language = detectGermanOrEnglish(text);

// 			if (language) {
// 				paragraph.style.color = `${
// 					language === "en" ? "#34c759" : "#ff3b30"
// 				}`;
// 			}
// 		}
// 	});
// }

// const observeNewParagraphs = () => {
// 	const observer = new MutationObserver((mutations) => {
// 		mutations.forEach((mutation) => {
// 			if (mutation.addedNodes.length > 0) {
// 				mutation.addedNodes.forEach((node) => {
// 					if (
// 						node.nodeType === Node.ELEMENT_NODE &&
// 						node.matches(".issue-link")
// 					) {
// 						const text = node.textContent;
// 						if (text) {
// 							const language = detectGermanOrEnglish(text);

// 							if (language) {
// 								node.style.color = `${
// 									language === "en" ? "#34c759" : "#ff3b30"
// 								}`;
// 							}
// 						}
// 					}
// 				});
// 			}
// 		});
// 	});

// 	observer.observe(document.body, {
// 		childList: true,
// 		subtree: true,
// 	});
// };
