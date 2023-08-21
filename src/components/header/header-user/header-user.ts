import BaseComponent from '../../base-component';
import Button from '../../button/button';
import Link from '../../link/link';
import { AppRoutesPath } from '../../../router/types';
import { changeUrlEvent } from '../../../utils/change-url-event';
import userStore from '../../../store/user-store';
import './header-user.scss';

export default class HeaderUser extends BaseComponent<'div'> {
  private account: HTMLDivElement;
  private dropdownMenu: HTMLDivElement;
  private cart: HTMLDivElement;

  constructor() {
    super('div', ['header__user']);

    this.account = new BaseComponent<'div'>('div', ['header__user-account']).getElement();
    this.dropdownMenu = new BaseComponent<'div'>('div', ['dropdown-menu', 'dropdown-menu_closed']).getElement();

    this.account.append(...this.drawAccount());

    this.cart = this.drawCart();

    this.node.append(this.account, this.cart);

    this.setListeners();
    this.addSubscribtion();
  }

  private drawAccount(isAuthorized: boolean = false): HTMLElement[] {
    const accountIcon = new BaseComponent<'span'>('span', ['user-account__icon']).getElement();
    const accountTitle = new BaseComponent<'p'>('p', ['user-account__title'], 'Account').getElement();

    if (isAuthorized) {
      const userName = `${userStore.getState().customer?.firstName}`;

      accountIcon.classList.add('user-account__icon_authorized');
      accountIcon.textContent = `${userName[0]}`;
      accountTitle.textContent = userName;
    }
    const bridge: HTMLDivElement = new BaseComponent('div', ['header__bridge']).getElement();

    this.dropdownMenu = new BaseComponent<'div'>('div', ['dropdown-menu', 'dropdown-menu_closed']).getElement();
    this.dropdownMenu.append(...this.drawDropdownMenu(isAuthorized));

    return [accountIcon, accountTitle, bridge, this.dropdownMenu];
  }

  private setListeners() {
    this.account.onmouseenter = (event) => {
      if (event.target instanceof HTMLElement) this.toggleDropdownMenu();
    };

    this.account.onmouseleave = (event) => {
      if (event.target instanceof HTMLElement) this.toggleDropdownMenu();
    };
  }

  private drawDropdownMenu(isAuthorized: boolean = false) {
    if (isAuthorized) {
      const profileBtn = new Link(
        'My profile',
        ['link--unset', 'dropdown-menu__link'],
        AppRoutesPath.MAIN
      ).getElement();
      const logoutBtn = new Link(
        'Logout',
        ['link--unset', 'link--logout', 'dropdown-menu__link'],
        AppRoutesPath.LOGIN
      ).getElement();

      logoutBtn.onclick = () => {
        userStore.dispatch({ type: 'REMOVE_TOKEN' });
        userStore.dispatch({ type: 'REMOVE_CUSTOMER' });
      };

      return [profileBtn, logoutBtn];
    }

    const loginBtn: HTMLButtonElement = new Button('button', 'Log In', ['dropdown-menu__button'], false, () =>
      changeUrlEvent(AppRoutesPath.LOGIN)
    ).getElement();

    const createAccountBtn: HTMLAnchorElement = new Link(
      'Create Account',
      ['link--arrow', 'dropdown-menu__link'],
      AppRoutesPath.SIGN_UP
    ).getElement();

    return [loginBtn, createAccountBtn];
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
    const cartIcon: HTMLAnchorElement = new Link('', ['user-cart__icon'], AppRoutesPath.ANCHOR).getElement();
    const cartCounter: HTMLDivElement = new BaseComponent<'div'>('div', ['user-cart__counter'], '0').getElement();

    cart.append(cartIcon, cartCounter);

    return cart;
  }

  private updateAccount(isAuthorized: boolean): void {
    this.account.innerHTML = '';

    this.account.append(...this.drawAccount(isAuthorized));
  }

  private addSubscribtion(): void {
    userStore.subscribe((state) => {
      if (state.token) {
        this.updateAccount(true);
      } else {
        this.updateAccount(false);
      }
    });
  }
}
