import BaseComponent from '../base-component';
import './link.scss';

export default class Link extends BaseComponent<'a'> {
  constructor(text: string, classes: string[] = [], href: string = '#') {
    super('a', ['link', ...classes], text);
    this.node.href = href;
  }
}
