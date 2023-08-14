import BaseComponent from '../base-component';
import Logo from '../logo/logo';
import menuItems from '../header/header-nav/menu-items';
import './footer.scss';
import { IMenuItems } from '../../types/types';

export default class Footer extends BaseComponent<'footer'> {
  private container: HTMLDivElement;

  constructor() {
    super('footer', ['footer']);

    this.container = this.createMarkup();

    this.node.append(this.container);
  }

  createMarkup() {
    const container = new BaseComponent<'div'>('div', ['footer__container']).getElement();
    const footerInfo = this.drawFooterInfo();
    const footerNavigation = this.drawNavigation();

    container.append(footerInfo, footerNavigation);

    return container;
  }

  drawFooterInfo(): HTMLDivElement {
    const footerInfo = new BaseComponent<'div'>('div', ['footer__information']).getElement();
    const footerLogo: HTMLAnchorElement = new Logo().getElement();
    const footerSubtitle: HTMLParagraphElement = new BaseComponent<'p'>(
      'p',
      ['footer__subtitle'],
      'From hidden gems to iconic landmarks, our journeys are designed to ignite your sense of wonder.'
    ).getElement();

    const footerPostSubtitle = new BaseComponent(
      'p',
      ['footer__post-subtitle'],
      'The project is made for noncommercial purposes.'
    ).getElement();

    footerInfo.append(footerLogo, footerSubtitle, footerPostSubtitle);

    return footerInfo;
  }

  drawNavigation() {
    const navigation = new BaseComponent<'nav'>('nav', ['footer__nav']).getElement();

    menuItems.forEach((item: IMenuItems) => {
      if (item.innerItems) {
        const menu = new BaseComponent<'ul'>('ul', ['footer__menu']).getElement();

        const menuTitle = new BaseComponent<'li'>('li', ['menu__item', 'menu__title']).getElement();
        const menuTitleLink = new BaseComponent<'a'>('a', ['menu__link'], item.title).getElement();

        menuTitleLink.href = item.href;

        menuTitle.append(menuTitleLink);
        menu.append(menuTitle);

        item.innerItems.forEach((innerItem) => {
          const menuItem = new BaseComponent<'li'>('li', ['menu__item']).getElement();
          const menuItemLink = new BaseComponent<'a'>('a', ['menu__link'], innerItem.title).getElement();

          menuItemLink.href = innerItem.href;

          menuItem.append(menuItemLink);

          menu.append(menuItem);
        });

        navigation.append(menu);
      }
    });
    const pagesMenu = new BaseComponent<'ul'>('ul', ['footer__menu']).getElement();

    const pagesItem = this.createListItem('Pages', ['menu__item', 'menu__title'], '#');
    const aboutUsItem = this.createListItem('About Us', ['menu__item'], '#');
    const accountItem = this.createListItem('Account', ['menu__item'], '#');
    const shoppingCartItem = this.createListItem('Shopping Cart', ['menu__item'], '#');

    pagesMenu.append(pagesItem, aboutUsItem, accountItem, shoppingCartItem);

    navigation.append(pagesMenu);

    return navigation;
  }

  private createListItem(name: string, classNames: string[], href: string): HTMLLIElement {
    const listItem: HTMLLIElement = new BaseComponent<'li'>('li', [...classNames]).getElement();
    const itemLink: HTMLAnchorElement = new BaseComponent<'a'>('a', ['menu__link'], name).getElement();

    itemLink.href = href;

    listItem.append(itemLink);

    return listItem;
  }
}
