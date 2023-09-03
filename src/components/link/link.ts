import BaseComponent from '../base-component';
import { AppRoutesPath } from '../../router/types';
import { changeUrlEvent } from '../../utils/change-url-event';
import './link.scss';

export default class Link extends BaseComponent<'a'> {
  constructor(text: string, classes: string[] = [], href: AppRoutesPath | string) {
    super('a', ['link', ...classes], text);
    this.node.href = href;

    this.node.addEventListener('click', (e) => {
      e.preventDefault();
      changeUrlEvent(href);
    });
  }
}
