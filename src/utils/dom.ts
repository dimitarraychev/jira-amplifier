import { franc } from 'franc-min';

export const waitForElementsThenExecute = (
  selector: string,
  callback: Function
) => {
  const elements = document.querySelectorAll(
    selector
  ) as NodeListOf<HTMLElement>;

  if (elements.length === 0) {
    console.log('No elements found. Waiting for dynamic content...');

    setTimeout(() => waitForElementsThenExecute(selector, callback), 1000);
  } else {
    callback();
  }
};

export const addLanguageTag = (element: HTMLElement) => {
  const reporter = element.getAttribute('rel');
  if (!reporter) return;
  const row = element.closest('tr');
  if (!row) return;
  const issueLink = row.querySelectorAll('.issue-link')[2];
  if (!issueLink) return;

  removeLanguageTag(element);

  const prefixes = ['AW', 'DE', 'VZ', 'VD', 'PT', 'OS', 'IL', 'BT', 'CH'];
  const matchesPrefix = prefixes.some((prefix) => reporter.startsWith(prefix));

  const langTag = document.createElement('span');
  langTag.textContent = `${matchesPrefix ? '[DE]' : '[EN]'}`;
  langTag.style.color = `${matchesPrefix ? '#ff3b30' : '#34c759'}`;

  issueLink.insertBefore(langTag, issueLink.firstChild);
};

export const removeLanguageTag = (element: HTMLElement) => {
  const row = element.closest('tr');
  if (!row) return;
  const issueLink = row.querySelectorAll('.issue-link')[2];
  if (!issueLink) return;
  const spans = issueLink.querySelectorAll('span');

  spans.forEach((span) => {
    if (span.textContent && span.textContent.startsWith('[')) {
      issueLink.removeChild(span);
    }
  });
};

export const addLayerTwoTag = (element: HTMLElement) => {
  const text = element.textContent;
  if (!text) return;

  const l2 = ['Dimitar Poydovski', 'Stanislav Petrov', 'Izabela Nikolova'];

  if (l2.includes(text)) {
    element.textContent = '[L2]' + text;
  }
};

export const removeLayerTwoTag = (element: HTMLElement) => {
  const text = element.textContent;
  element.textContent = text?.startsWith('[L2]') ? text.slice(4) : text;
};
