export default class BaseComponent {
  protected node: HTMLElement;

  constructor(tagName: keyof HTMLElementTagNameMap = 'div', classNames: Array<string> = [], textContent: string = '') {
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    this.node.textContent = textContent;
  }

  public getElement(): HTMLElement {
    return this.node;
  }
}
