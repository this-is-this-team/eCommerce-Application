import './header-nav.scss';
import BaseComponent from '../../base-component';
import menuItems from './menu-items';
import { IMenuItems } from '../../../types/types';
import Link from '../../link/link';

export default class HeaderNav extends BaseComponent<'nav'> {
  private list: HTMLUListElement;

  constructor() {
    super('nav', ['header__menu']);

    this.list = this.createHeaderList(menuItems);

    this.node.append(this.list);
  }

  private createHeaderList(menuItems: IMenuItems[] = []): HTMLUListElement {
    const headerList: HTMLUListElement = new BaseComponent<'ul'>('ul', ['header__list']).getElement();

    menuItems.forEach((item) => {
      const headerItem: HTMLLIElement = this.createListItem(item, [
        'header__item',
        item['innerItems'] ? 'header__item_with-submenu' : 'header__item_empty',
      ]);

      const { innerItems }: IMenuItems = item;

      if (innerItems) {
        const bridge: HTMLDivElement = new BaseComponent<'div'>('div', ['header__bridge']).getElement();
        const dropdownMenu: HTMLUListElement = new BaseComponent<'ul'>('ul', [
          'dropdown-menu',
          'dropdown-menu_closed',
        ]).getElement();

        innerItems.forEach((innerItem) => {
          const innerListItem: HTMLLIElement = this.createListItem(innerItem, ['item__inner-item']);

          dropdownMenu.append(innerListItem);

          headerItem.append(bridge);

          headerItem.append(dropdownMenu);

          headerItem.onmouseenter = (event) => {
            if (event.target instanceof HTMLElement) this.showInnerList(event.target);
          };

          headerItem.onmouseleave = (event) => {
            if (event.target instanceof HTMLElement) this.hideInnerList(event.target);
          };
        });
      }

      headerList.append(headerItem);
    });

    return headerList;
  }

  private createListItem(menuItem: IMenuItems, classNames: string[]): HTMLLIElement {
    const listItem: HTMLLIElement = new BaseComponent<'li'>('li', [...classNames]).getElement();
    const itemLink: HTMLAnchorElement = new Link(menuItem.title, ['header__link'], menuItem.href).getElement();

    listItem.append(itemLink);

    return listItem;
  }

  private showInnerList(element: HTMLElement): void {
    const classClosed = 'dropdown-menu_closed';
    const classOpened = 'dropdown-menu_opened';
    const dropdownMenu = element.querySelector(`.${classClosed}`);

    if (dropdownMenu) {
      dropdownMenu.classList.remove(classClosed);
      dropdownMenu.classList.add(classOpened);
    }
  }

  private hideInnerList(element: HTMLElement): void {
    const classClosed = 'dropdown-menu_closed';
    const classOpened = 'dropdown-menu_opened';
    const dropdownMenu = element.querySelector(`.${classOpened}`);

    if (dropdownMenu) {
      dropdownMenu.classList.remove(classOpened);
      dropdownMenu.classList.add(classClosed);
    }
  }
}
