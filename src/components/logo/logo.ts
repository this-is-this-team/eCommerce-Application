import './logo.scss';
import BaseComponent from '../base-component';

export default class Logo extends BaseComponent<'a'> {
  constructor() {
    super('a', ['logo'], 'this is this.');

    this.node.href = '#';
  }
}
