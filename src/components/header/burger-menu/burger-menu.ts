import './burger-menu.scss';
import BaseComponent from '../../base-component';

export default class BurgerMenu extends BaseComponent<'div'> {
  private classOpened = 'burger-menu_opened';
  private classClosed = 'burger-menu_closed';
  private body: HTMLBodyElement | null = document.querySelector('body');
  private blur: HTMLDivElement;
  private headerMenu: HTMLElement | null;

  constructor() {
    super('div', ['burger-menu', 'burger-menu_closed']);

    this.blur = new BaseComponent<'div'>('div', ['blur']).getElement();
    this.drawBurgerMenu();
    this.headerMenu = document.querySelector('.header__menu');

    this.node.onclick = () => {
      this.toggleBurgerMenu();
    };

    this.blur.onclick = () => {
      this.toggleBurgerMenu();
    };
  }

  private drawBurgerMenu(): void {
    for (let i = 0; i < 3; i++) {
      const line = new BaseComponent<'div'>('div', ['burger-menu__line']).getElement();
      this.node.append(line);
    }
  }

  private toggleBurgerMenu(): void {
    const headerMenu: HTMLElement | null = this.headerMenu ? this.headerMenu : document.querySelector('.header__menu');
    const isBurgerMenuClosed = this.node.classList.contains(this.classClosed);

    if (this.body) {
      if (this.body?.firstElementChild !== this.blur) {
        this.body.prepend(this.blur);
      } else {
        this.body.removeChild(this.blur);
      }
    }

    if (headerMenu) {
      if (headerMenu.classList.contains('header__menu_opened')) {
        headerMenu.classList.remove('header__menu_opened');
      } else {
        headerMenu.classList.add('header__menu_opened');
      }
    }

    this.node.classList.toggle(this.classClosed, !isBurgerMenuClosed);
    this.node.classList.toggle(this.classOpened, isBurgerMenuClosed);
  }
}
