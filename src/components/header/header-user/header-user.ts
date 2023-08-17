import BaseComponent from '../../base-component';
import Button from '../../button/button';
import Link from '../../link/link';
import './header-user.scss';

export default class HeaderUser extends BaseComponent<'div'> {
  private account: HTMLDivElement;
  private dropdownMenu: HTMLDivElement;
  private cart: HTMLDivElement;

  constructor() {
    super('div', ['header__user']);

    this.dropdownMenu = this.drawDropdownMenu();
    this.account = this.drawAccount();
    this.cart = this.drawCart();

    this.node.append(this.account, this.cart);
  }

  private drawAccount(): HTMLDivElement {
    const account: HTMLDivElement = new BaseComponent<'div'>('div', ['header__user-account']).getElement();
    const accountIcon: HTMLSpanElement = new BaseComponent<'span'>('span', ['user-account__icon']).getElement();
    const accountTitle: HTMLParagraphElement = new BaseComponent<'p'>(
      'p',
      ['user-account__title'],
      'Account'
    ).getElement();

    const bridge: HTMLDivElement = new BaseComponent('div', ['header__bridge']).getElement();

    account.onmouseenter = (event) => {
      if (event.target instanceof HTMLElement) this.toggleDropdownMenu();
    };

    account.onmouseleave = (event) => {
      if (event.target instanceof HTMLElement) this.toggleDropdownMenu();
    };

    account.append(accountIcon, accountTitle, bridge, this.dropdownMenu);

    return account;
  }

  private drawDropdownMenu(): HTMLDivElement {
    const dropdownMenu: HTMLDivElement = new BaseComponent<'div'>('div', [
      'dropdown-menu',
      'dropdown-menu_closed',
    ]).getElement();

    const loginBtn: HTMLButtonElement = new Button('button', 'Log In', ['dropdown-menu__button']).getElement();
    const createAccountBtn: HTMLAnchorElement = new Link(
      'Create Account',
      ['link--arrow', 'dropdown-menu__link'],
      '#'
    ).getElement();

    dropdownMenu.append(loginBtn, createAccountBtn);

    return dropdownMenu;
  }

  private toggleDropdownMenu(): void {
    const classOpened = 'dropdown-menu_opened';
    const classClosed = 'dropdown-menu_closed';
    const isDropDownMenuClosed = this.dropdownMenu.classList.contains(classClosed);

    this.dropdownMenu.classList.toggle(classOpened, isDropDownMenuClosed);
    this.dropdownMenu.classList.toggle(classClosed, !isDropDownMenuClosed);
  }

  private drawCart(): HTMLDivElement {
    const cart: HTMLDivElement = new BaseComponent<'div'>('div', ['header__user-cart']).getElement();
    const cartIcon: HTMLAnchorElement = new Link('', ['user-cart__icon'], '#').getElement();
    const cartCounter: HTMLDivElement = new BaseComponent<'div'>('div', ['user-cart__counter'], '0').getElement();

    cart.append(cartIcon, cartCounter);

    return cart;
  }
}
