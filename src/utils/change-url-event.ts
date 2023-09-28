import { AppRoutesPath } from '../router/types';

export function changeUrlEvent(href: AppRoutesPath | string): void {
  window.history.pushState({}, '', href);
  const changeURL = new CustomEvent('changeURL', { bubbles: true });
  window.dispatchEvent(changeURL);
}
