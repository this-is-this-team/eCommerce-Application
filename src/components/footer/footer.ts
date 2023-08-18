import BaseComponent from '../base-component';
import Logo from '../logo/logo';
import menuItems from '../header/header-nav/menu-items';
import Link from '../link/link';
import { AppRoutesPath } from '../../router/types';
import { IMenuItems } from '../../types/types';
import './footer.scss';

export default class Footer extends BaseComponent<'footer'> {
  private container: HTMLDivElement;

  constructor() {
    super('footer', ['footer']);

    this.container = this.createMarkup();

    this.node.append(this.container);
  }

  private createMarkup(): HTMLDivElement {
    const container: HTMLDivElement = new BaseComponent<'div'>('div', ['footer__container']).getElement();
    const footerInfo: HTMLDivElement = this.drawFooterInfo();
    const footerNavigation: HTMLElement = this.drawNavigation();

    container.append(footerInfo, footerNavigation);

    return container;
  }

  private drawFooterInfo(): HTMLDivElement {
    const footerInfo: HTMLDivElement = new BaseComponent<'div'>('div', ['footer__information']).getElement();
    const footerLogo: HTMLHeadingElement = new Logo().getElement();
    const footerSubtitle: HTMLParagraphElement = new BaseComponent<'p'>(
      'p',
      ['footer__subtitle'],
      'From hidden gems to iconic landmarks, our journeys are designed to ignite your sense of wonder.'
    ).getElement();

    const footerPostSubtitle: HTMLParagraphElement = new BaseComponent<'p'>(
      'p',
      ['footer__post-subtitle'],
      'The project is made for noncommercial purposes.'
    ).getElement();

    footerInfo.append(footerLogo, footerSubtitle, footerPostSubtitle);

    return footerInfo;
  }

  private drawNavigation(): HTMLElement {
    const navigation: HTMLElement = new BaseComponent<'nav'>('nav', ['footer__nav']).getElement();

    menuItems.forEach((item: IMenuItems) => {
      if (item.innerItems) {
        const menu: HTMLUListElement = new BaseComponent<'ul'>('ul', ['footer__menu']).getElement();

        const menuTitle: HTMLLIElement = this.createListItem(item.title, ['menu__item', 'menu__title'], item.href);

        menu.append(menuTitle);

        item.innerItems.forEach((innerItem) => {
          const menuItem: HTMLLIElement = this.createListItem(innerItem.title, ['menu__item'], innerItem.href);

          menu.append(menuItem);
        });

        navigation.append(menu);
      }
    });

    const pagesMenu: HTMLUListElement = new BaseComponent<'ul'>('ul', ['footer__menu']).getElement();

    const pagesItem: HTMLLIElement = this.createListItem('Pages', ['menu__item', 'menu__title'], AppRoutesPath.ANCHOR);
    const aboutUsItem: HTMLLIElement = this.createListItem('About Us', ['menu__item'], AppRoutesPath.ANCHOR);
    const accountItem: HTMLLIElement = this.createListItem('Account', ['menu__item'], AppRoutesPath.ANCHOR);
    const shoppingCartItem: HTMLLIElement = this.createListItem('Shopping Cart', ['menu__item'], AppRoutesPath.ANCHOR);

    pagesMenu.append(pagesItem, aboutUsItem, accountItem, shoppingCartItem);

    navigation.append(pagesMenu);

    return navigation;
  }

  private createListItem(name: string, classNames: string[], href: AppRoutesPath): HTMLLIElement {
    const listItem: HTMLLIElement = new BaseComponent<'li'>('li', [...classNames]).getElement();
    const itemLink: HTMLAnchorElement = new Link(name, ['menu__link'], href).getElement();

    listItem.append(itemLink);

    return listItem;
  }
}
