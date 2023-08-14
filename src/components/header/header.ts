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

  createMarkup() {
    const container: HTMLDivElement = new BaseComponent<'div'>('div', ['header__container']).getElement();
    const logoMenuWrapper: HTMLDivElement = new BaseComponent<'div'>('div', ['header__logo-menu']).getElement();
    const headerLogo: HTMLAnchorElement = new Logo().getElement();
    const navigation: HTMLElement = new HeaderNav().getElement();
    const userWrapper = new HeaderUser().getElement();

    logoMenuWrapper.append(headerLogo, navigation);

    container.append(logoMenuWrapper);
    container.append(userWrapper);

    return container;
  }
}
