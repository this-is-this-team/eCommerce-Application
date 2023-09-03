import { ICategory } from '../../types/types';
import BaseComponent from '../base-component';
import Link from '../link/link';
import './category-list.scss';

export default class CategoryList extends BaseComponent<'div'> {
  constructor(title: string, categories: ICategory[], currentSlug: string) {
    super('div', ['category-list']);

    this.drawList(title, categories, currentSlug);
  }

  private drawList(title: string, items: ICategory[], currentSlug: string): void {
    const container: HTMLDivElement = new BaseComponent('div', ['category-list__container']).getElement();
    const titleElelemt: HTMLHeadingElement = new BaseComponent('h4', ['category-list__title'], title).getElement();
    const categoryList: HTMLDivElement = new BaseComponent('div', ['category-list__list']).getElement();
    const categoryElements = items.map((item) => {
      const classes: string[] =
        currentSlug === item.slug ? ['category-list__link', 'category-list__link--active'] : ['category-list__link'];
      return new Link(item.label, ['link', ...classes], item.url).getElement();
    });
    categoryList.append(...categoryElements);
    container.append(titleElelemt, categoryList);

    this.node.append(container);
  }
}
