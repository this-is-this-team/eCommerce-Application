import BaseComponent from '../base-component';
import { changeUrlEvent } from '../../utils/change-url-event';
import './link.scss';

export default class Link extends BaseComponent<'a'> {
  // TODO: change href type from string to AppRoutesPath (in #36 issue)
  constructor(text: string, classes: string[] = [], href: string = '#') {
    super('a', ['link', ...classes], text);
    this.node.href = href;

    this.node.addEventListener('click', (e) => {
      e.preventDefault();
      changeUrlEvent(href);
    });
  }
}
