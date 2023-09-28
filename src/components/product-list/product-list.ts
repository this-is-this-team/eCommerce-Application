import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import ProductCard from '../product-card/product-card';
import './product-list.scss';

export default class ProductList extends BaseComponent<'section'> {
  private items: ProductProjection[];
  private cards: HTMLDivElement[];
  private container: HTMLDivElement;

  constructor(items: ProductProjection[]) {
    super('section', ['product-list']);

    this.items = items;
    this.cards = [];
    this.container = new BaseComponent('div', ['product-list__container']).getElement();

    this.createMarkup();
  }

  private async createMarkup(): Promise<void> {
    if (this.items.length) {
      this.cards = this.items.map((item) => {
        return new ProductCard(item).getElement();
      });
      this.container.append(...this.cards);
    } else {
      const emptyListText = new BaseComponent('div', ['product-list__empty'], 'No tours found').getElement();
      this.container.append(emptyListText);
    }

    this.node.append(this.container);
  }

  public addNewProducts(cards: HTMLElement[]): void {
    this.container.append(...cards);
  }
}
