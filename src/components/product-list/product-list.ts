import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import ProductCard from '../product-card/product-card';
import './product-list.scss';

export default class ProductList extends BaseComponent<'section'> {
  private items: ProductProjection[];
  private cards: HTMLDivElement[];

  constructor(items: ProductProjection[]) {
    super('section', ['product-list']);

    this.items = items;
    this.cards = [];

    this.createMarkup();
  }

  private async createMarkup(): Promise<void> {
    const container: HTMLDivElement = new BaseComponent('div', ['product-list__container']).getElement();

    if (this.items.length) {
      this.cards = this.items.map((item) => {
        return new ProductCard(item).getElement();
      });
      container.append(...this.cards);
    } else {
      const emptyListText = new BaseComponent('div', ['product-list__empty'], 'No tours available').getElement();
      container.append(emptyListText);
    }

    this.node.append(container);
  }
}
