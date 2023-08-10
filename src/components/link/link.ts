import BaseComponent from '../base-component';
import './link.scss';

export default class Link extends BaseComponent {
  constructor(text: string, classes: string[] = [], href: string = '#') {
    super('a', ['link', ...classes], text);
    if (this.node instanceof HTMLLinkElement) {
      this.node.href = href;
    }
  }
}
