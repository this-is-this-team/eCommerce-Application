import BaseComponent from '../../base-component';
import Button from '../../button/button';
import Link from '../../link/link';
import { AppRoutesPath } from '../../../router/types';
import { changeUrlEvent } from '../../../utils/change-url-event';
import userStore from '../../../store/user-store';
import userLogout from '../../../services/userLogout';
import './header-user.scss';
import cartStore from '../../../store/cart-store';

export default class HeaderUser extends BaseComponent<'div'> {
  private account: HTMLDivElement;
  private dropdownMenu: HTMLDivElement;
  private cart: HTMLAnchorElement;
  private accountIcon: HTMLSpanElement;
  private accountTitle: HTMLParagraphElement;
  private loginBtn: HTMLButtonElement;
  private createAccountBtn: HTMLAnchorElement;
  private logoutBtn: HTMLButtonElement;
  private profileBtn: HTMLAnchorElement;
  private bridge: HTMLDivElement;
  private cartCounter: HTMLDivElement;

  constructor() {
    super('div', ['header__user']);

    this.account = new BaseComponent<'div'>('div', ['header__user-account']).getElement();
    this.accountIcon = new BaseComponent<'span'>('span', ['user-account__icon']).getElement();
    this.accountTitle = new BaseComponent<'p'>('p', ['user-account__title'], 'Account').getElement();
    this.dropdownMenu = new BaseComponent<'div'>('div', ['dropdown-menu', 'dropdown-menu_closed']).getElement();
    this.profileBtn = new Link(
      'My profile',
      ['link--unset', 'dropdown-menu__link'],
      AppRoutesPath.ACCOUNT
    ).getElement();
    this.loginBtn = new Button('button', 'Log In', ['dropdown-menu__button'], false, () =>
      changeUrlEvent(AppRoutesPath.LOGIN)
    ).getElement();
    this.createAccountBtn = new Link(
      'Create Account',
      ['link--arrow', 'dropdown-menu__link'],
      AppRoutesPath.SIGN_UP
    ).getElement();

    this.logoutBtn = new Button('button', 'Log Out', ['dropdown-menu__button'], false, () => {
      userLogout();
      changeUrlEvent(AppRoutesPath.MAIN);
    }).getElement();

    this.bridge = new BaseComponent('div', ['header__bridge']).getElement();

    this.drawAccount(userStore.getState().isAuth);

    this.cartCounter = new BaseComponent<'div'>('div', ['user-cart__counter'], '0').getElement();
    this.cart = this.drawCart();

    this.node.append(this.account, this.cart);

    this.setListeners();
    this.addSubscribtion();
  }

  private drawAccount(isAuth: boolean): void {
    if (isAuth) {
      const userName = `${userStore.getState().customer?.firstName}`;

      this.accountIcon.classList.add('user-account__icon_authorized');
      this.accountIcon.textContent = `${userName[0]}`;
      this.accountTitle.textContent = userName;

      this.dropdownMenu.innerHTML = '';
      this.dropdownMenu.append(this.profileBtn, this.logoutBtn);
    } else {
      this.accountIcon.classList.remove('user-account__icon_authorized');
      this.accountIcon.textContent = '';
      this.accountTitle.textContent = 'Account';

      this.dropdownMenu.innerHTML = '';
      this.dropdownMenu.append(this.loginBtn, this.createAccountBtn);
    }

    this.account.innerHTML = '';
    this.account.append(this.accountIcon, this.accountTitle, this.bridge, this.dropdownMenu);
  }

  private setListeners(): void {
    this.account.addEventListener('click', () => this.onOpenDropdownMenu());
    this.account.addEventListener('mouseenter', () => this.onOpenDropdownMenu());
    this.account.addEventListener('mouseleave', () => this.onCloseDropdownMenu());
  }

  private closeDropdownOnMobile(event: TouchEvent): void {
    if (this.dropdownMenu.classList.contains('dropdown-menu_opened')) {
      if (event.target instanceof HTMLElement) {
        if (this.account && event.target !== this.account && !event.target.closest('.header__user-account')) {
          this.onCloseDropdownMenu();
        }
      }
    }
  }

  private onOpenDropdownMenu(): void {
    this.dropdownMenu.classList.remove('dropdown-menu_closed');
    this.dropdownMenu.classList.add('dropdown-menu_opened');

    document.body?.addEventListener('touchstart', (event) => this.closeDropdownOnMobile(event));
  }

  private onCloseDropdownMenu(): void {
    this.dropdownMenu.classList.remove('dropdown-menu_opened');
    this.dropdownMenu.classList.add('dropdown-menu_closed');

    document.body?.removeEventListener('touchstart', (event) => this.closeDropdownOnMobile(event));
  }

  private drawCart(): HTMLAnchorElement {
    const cart: HTMLAnchorElement = new Link('', ['header__user-cart'], AppRoutesPath.BASKET).getElement();
    const cartIcon: HTMLDivElement = new BaseComponent<'div'>('div', ['user-cart__icon']).getElement();

    cart.append(cartIcon, this.cartCounter);

    return cart;
  }

  private addSubscribtion(): void {
    userStore.subscribe((state) => this.drawAccount(state.isAuth));

    cartStore.subscribe((state) => {
      this.cartCounter.textContent = state.cart?.totalLineItemQuantity ? String(state.cart.totalLineItemQuantity) : '0';
    });
  }
}
