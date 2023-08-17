// TODO: change href type from string to AppRoutesPath (in #36 issue)
export function changeUrlEvent(href: string): void {
  window.history.pushState({}, '', href);
  const changeURL = new CustomEvent('changeURL', { bubbles: true });
  window.dispatchEvent(changeURL);
}
