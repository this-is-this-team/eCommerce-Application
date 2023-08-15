import BaseComponent from '../../base-component';
import Button from '../../button/button';
import './header-user.scss';

export default class HeaderUser extends BaseComponent<'div'> {
  private account: HTMLDivElement;
  private dropdownMenu: HTMLDivElement;
  private cart: HTMLDivElement;

  constructor() {
    super('div', ['header__user']);

    this.dropdownMenu = this.drawDropdownMenu();
    this.account = this.drawAccount();
    this.cart = this.drawBag();

    this.node.append(this.account, this.cart);
  }

  private drawAccount(): HTMLDivElement {
    const account: HTMLDivElement = new BaseComponent<'div'>('div', ['header__user-account']).getElement();
    const accountIcon: HTMLSpanElement = new BaseComponent<'span'>('span', ['user-account__icon']).getElement();
    const accountTitle: HTMLAnchorElement = new BaseComponent<'a'>(
      'a',
      ['user-account__title', 'header__link'],
      'Account'
    ).getElement();

    const bridge: HTMLDivElement = new BaseComponent('div', ['header__bridge']).getElement();

    accountTitle.href = '#';

    account.onmouseenter = (event) => {
      if (event.target instanceof HTMLElement) this.showDropdownMenu();
    };

    account.onmouseleave = (event) => {
      if (event.target instanceof HTMLElement) this.hideDropdownMenu();
    };

    accountTitle.prepend(accountIcon);

    account.append(accountTitle, bridge, this.dropdownMenu);

    return account;
  }

  private drawDropdownMenu(): HTMLDivElement {
    const dropdownMenu: HTMLDivElement = new BaseComponent<'div'>('div', [
      'dropdown-menu',
      'dropdown-menu_closed',
    ]).getElement();

    const loginBtn: HTMLButtonElement = new Button('button', 'Log In', ['dropdown-menu__button']).getElement();
    const createAccountBtn: HTMLAnchorElement = new BaseComponent<'a'>(
      'a',
      ['dropdown-menu__link'],
      'Create Account'
    ).getElement();

    const arrowIcon: HTMLSpanElement = new BaseComponent<'span'>('span', ['dropdown-menu__link__span']).getElement();

    createAccountBtn.href = '#';

    createAccountBtn.append(arrowIcon);

    dropdownMenu.append(loginBtn, createAccountBtn);

    return dropdownMenu;
  }

  private showDropdownMenu(): void {
    const classOpened = 'dropdown-menu_opened';
    const classClosed = 'dropdown-menu_closed';

    if (this.dropdownMenu.classList.contains(classClosed)) {
      this.dropdownMenu.classList.remove(classClosed);
      this.dropdownMenu.classList.add(classOpened);
    }
  }

  private hideDropdownMenu(): void {
    const classOpened = 'dropdown-menu_opened';
    const classClosed = 'dropdown-menu_closed';

    if (this.dropdownMenu.classList.contains(classOpened)) {
      this.dropdownMenu.classList.remove(classOpened);
      this.dropdownMenu.classList.add(classClosed);
    }
  }

  private drawBag(): HTMLDivElement {
    const bag: HTMLDivElement = new BaseComponent<'div'>('div', ['header__user-cart']).getElement();
    const bagIcon: HTMLAnchorElement = new BaseComponent<'a'>('a', ['user-cart__icon']).getElement();
    const bagCounter: HTMLDivElement = new BaseComponent<'div'>('div', ['user-cart__counter'], '0').getElement();

    bagIcon.href = '#';

    bag.append(bagIcon, bagCounter);

    return bag;
  }
}
