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
  const text = element.textContent;
  const ticketNumRegex = /^[A-Z]{3,5}-\d{6}$/;

  if (!text || ticketNumRegex.test(text)) return;

  removeLanguageTag(element);

  const language = franc(text, { only: ['eng', 'deu'], minLength: 5 });
  if (language === 'und') return;

  const langTag = document.createElement('span');
  langTag.textContent = `[${language.slice(0, 2).toUpperCase()}]`;
  langTag.style.color = `${language === 'deu' ? '#ff3b30' : '#34c759'}`;

  element.insertBefore(langTag, element.firstChild);
};

export const removeLanguageTag = (element: HTMLElement) => {
  const spans = element.querySelectorAll('span');

  spans.forEach((span) => {
    if (span.textContent && span.textContent.startsWith('[')) {
      element.removeChild(span);
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
