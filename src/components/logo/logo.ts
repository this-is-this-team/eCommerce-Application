import BaseComponent from '../base-component';
import Link from '../link/link';
import { AppRoutesPath } from '../../router/types';
import './logo.scss';

export default class Logo extends BaseComponent<'h1'> {
  constructor() {
    super('h1', ['logo']);

    const logoLink = new Link('this is this.', ['logo__link'], AppRoutesPath.MAIN).getElement();

    this.node.append(logoLink);
  }
}
