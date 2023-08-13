import Logo from '../../logo/logo';
import BaseComponent from '../../base-component';

export default class HeaderLogo extends BaseComponent<'a'> {
  private logo: HTMLDivElement = new Logo().getElement();

  constructor() {
    super('a', ['header__logo']);

    this.node.href = '#';

    this.node.append(this.logo);
  }
}
