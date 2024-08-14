import { franc } from 'franc-min';

export const addLanguageTag = (paragraph: HTMLElement) => {
  const text = paragraph.textContent;
  const ticketNumRegex = /^[A-Z]{3,5}-\d{6}$/;

  if (!text || ticketNumRegex.test(text)) return;

  removeLanguageTags(paragraph);

  const language = franc(text, { only: ['eng', 'deu'], minLength: 5 });
  if (language === 'und') return;

  const langTag = document.createElement('span');
  langTag.textContent = `[${language.slice(0, 2).toUpperCase()}]`;
  langTag.style.color = `${language === 'deu' ? '#ff3b30' : '#34c759'}`;

  paragraph.insertBefore(langTag, paragraph.firstChild);
};

export const removeLanguageTags = (paragraph: HTMLElement) => {
  const spans = paragraph.querySelectorAll('span');

  spans.forEach((span) => {
    if (span.textContent && span.textContent.startsWith('[')) {
      paragraph.removeChild(span);
    }
  });
};
