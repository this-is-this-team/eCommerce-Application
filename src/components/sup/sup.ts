import BaseComponent from '../base-component';
import './sup.scss';

export default class Sup extends BaseComponent<'sup'> {
  constructor(text: string, classes: string[] = []) {
    super('sup', ['sup', ...classes], text);
  }
}
