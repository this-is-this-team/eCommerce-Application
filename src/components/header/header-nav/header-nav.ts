import './header-nav.scss';
import BaseComponent from '../../base-component';
import menuItems from './menu-items';
import { IMenuItems } from '../../../types/types';

export default class HeaderNav extends BaseComponent<'nav'> {
  private list: HTMLUListElement;

  constructor() {
    super('nav', ['header__menu']);

    this.list = this.createHeaderList(menuItems);

    this.node.append(this.list);
  }

  createHeaderList(menuItems: IMenuItems[] = []): HTMLUListElement {
    const headerList: HTMLUListElement = new BaseComponent<'ul'>('ul', ['header__list']).getElement();

    menuItems.forEach((item) => {
      const headerItem: HTMLLIElement = this.createListItem(item, [
        'header__item',
        item['innerItems'] ? 'header__item_nested-closed' : 'header__item_empty',
      ]);

      const { innerItems }: IMenuItems = item;

      if (innerItems) {
        const bridge: HTMLDivElement = new BaseComponent<'div'>('div', ['item__bridge']).getElement();
        const itemInnerList: HTMLUListElement = new BaseComponent<'ul'>('ul', ['item__inner-list']).getElement();

        innerItems.forEach((innerItem) => {
          const innerListItem: HTMLLIElement = this.createListItem(innerItem, ['item__inner-item']);

          itemInnerList.append(innerListItem);

          headerItem.append(bridge);

          headerItem.append(itemInnerList);

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
    const itemLink: HTMLAnchorElement = new BaseComponent<'a'>('a', ['header__link'], menuItem.title).getElement();

    itemLink.href = menuItem.href;

    listItem.append(itemLink);

    return listItem;
  }

  private showInnerList(element: HTMLElement): void {
    const classClosed = 'header__item_nested-closed';
    const classOpened = 'header__item_nested-opened';

    if (element.classList.contains(classClosed)) {
      element.classList.remove(classClosed);
      element.classList.add(classOpened);
    }
  }

  private hideInnerList(element: HTMLElement): void {
    const classClosed = 'header__item_nested-closed';
    const classOpened = 'header__item_nested-opened';

    if (element.classList.contains(classOpened)) {
      element.classList.remove(classOpened);
      element.classList.add(classClosed);
    }
  }
}
