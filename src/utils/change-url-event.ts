import { AppRoutesPath } from '../router/types';

export function changeUrlEvent(href: AppRoutesPath): void {
  window.history.pushState({}, '', href);
  const changeURL = new CustomEvent('changeURL', { bubbles: true });
  window.dispatchEvent(changeURL);
  window.scrollTo(0, 0);
}
