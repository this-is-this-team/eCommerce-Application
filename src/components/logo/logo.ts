import './logo.scss';
import BaseComponent from '../base-component';
import Link from '../link/link';

export default class Logo extends BaseComponent<'h1'> {
  constructor() {
    super('h1', ['logo']);

    const logoLink = new Link('this is this.', ['logo__link'], '#').getElement();

    this.node.append(logoLink);
  }
}
