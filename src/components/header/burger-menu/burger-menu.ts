import './burger-menu.scss';
import BaseComponent from '../../base-component';

export default class BurgerMenu extends BaseComponent<'div'> {
  classOpened = 'burger-menu_opened';
  classClosed = 'burger-menu_closed';
  body: HTMLBodyElement | null = document.querySelector('body');
  blur: HTMLDivElement;
  headerMenu: HTMLElement | null;

  constructor() {
    super('div', ['burger-menu', 'burger-menu_closed']);

    this.blur = new BaseComponent<'div'>('div', ['blur']).getElement();
    this.drawBurgerMenu();
    this.headerMenu = document.querySelector('.header__menu');

    this.node.onclick = () => {
      this.switchBurgerMenu();
    };
  }

  private drawBurgerMenu(): void {
    for (let i = 0; i < 3; i++) {
      const line = new BaseComponent<'div'>('div', ['burger-menu__line']).getElement();
      this.node.append(line);
    }
  }

  private switchBurgerMenu(): void {
    const headerMenu: HTMLElement | null = this.headerMenu ? this.headerMenu : document.querySelector('.header__menu');

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

    if (this.node.classList.contains(this.classClosed)) {
      this.node.classList.remove(this.classClosed);
      this.node.classList.add(this.classOpened);
    } else if (this.node.classList.contains(this.classOpened)) {
      this.node.classList.remove(this.classOpened);
      this.node.classList.add(this.classClosed);
    }
  }
}
