import './header.scss';
import BaseComponent from '../base-component';
import HeaderNav from './header-nav/header-nav';
import HeaderUser from './header-user/header-user';
import Logo from '../logo/logo';

export default class Header extends BaseComponent<'header'> {
  private container: HTMLDivElement;

  constructor() {
    super('header', ['header']);

    this.container = this.createMarkup();

    this.node.append(this.container);
  }

  private createMarkup(): HTMLDivElement {
    const container: HTMLDivElement = new BaseComponent<'div'>('div', ['header__container']).getElement();
    const headerLogo: HTMLAnchorElement = new Logo().getElement();
    const navigation: HTMLElement = new HeaderNav().getElement();
    const userWrapper: HTMLDivElement = new HeaderUser().getElement();

    container.append(headerLogo, navigation, userWrapper);

    return container;
  }
}
