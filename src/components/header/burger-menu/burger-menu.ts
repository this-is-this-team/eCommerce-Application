import './burger-menu.scss';
import BaseComponent from '../../base-component';

export default class BurgerMenu extends BaseComponent<'div'> {
  private isOpenMenu: boolean;
  private blur: HTMLDivElement;
  private headerMenu: HTMLElement;

  constructor(headerMenu: HTMLElement) {
    super('div', ['burger-menu']);

    this.blur = new BaseComponent<'div'>('div', ['blur']).getElement();
    this.drawBurgerMenu();
    this.headerMenu = headerMenu;
    this.isOpenMenu = false;

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
    this.isOpenMenu = !this.isOpenMenu;

    if (this.isOpenMenu) {
      document.body.append(this.blur);
      document.body.classList.add('hidden');
      this.headerMenu.classList.add('header__menu_opened');
      this.node.classList.add('burger-menu_opened');
    } else {
      this.blur.remove();
      document.body.removeAttribute('class');
      this.headerMenu.classList.remove('header__menu_opened');
      this.node.classList.remove('burger-menu_opened');
    }
  }
}
