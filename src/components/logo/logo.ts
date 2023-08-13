import './logo.scss';
import BaseComponent from '../base-component';

export default class Logo extends BaseComponent<'div'> {
  constructor() {
    super('div', ['logo'], 'this is this.');
  }
}
