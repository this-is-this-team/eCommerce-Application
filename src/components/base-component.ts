export default class BaseComponent<K extends keyof HTMLElementTagNameMap> {
  protected node: HTMLElementTagNameMap[K];

  constructor(tagName: K, classNames: Array<string> = [], textContent: string = '') {
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    this.node.textContent = textContent;
  }

  public getElement(): HTMLElementTagNameMap[K] {
    return this.node;
  }
}
