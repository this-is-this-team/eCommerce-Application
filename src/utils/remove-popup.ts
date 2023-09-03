export function removePopupFromBody(className: string): void {
  const el = document.querySelector(className);
  el?.remove();
}
