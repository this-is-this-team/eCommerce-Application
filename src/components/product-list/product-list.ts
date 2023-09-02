import { Product } from '@commercetools/platform-sdk';
import getProducts from '../../services/getProducts';
import BaseComponent from '../base-component';
import ProductCard from '../product-card/product-card';
import './product-list.scss';

export default class ProductList extends BaseComponent<'section'> {
  private items: Product[];
  private cards: HTMLDivElement[];

  constructor() {
    super('section', ['product-list']);

    this.items = [];
    this.cards = [];

    this.createMarkup();
  }

  private async createMarkup(): Promise<void> {
    const container: HTMLDivElement = new BaseComponent('div', ['product-list__container']).getElement();
    try {
      this.items = await getProducts();

      this.cards = this.items.map((item) => {
        return new ProductCard(item).getElement();
      });

      console.log(this.items);
    } catch (error) {
      console.log(error);
    }

    if (this.cards.length) {
      container.append(...this.cards);
    } else {
      const emptyListText = new BaseComponent('div', ['product-list__empty'], 'No tours available').getElement();
      container.append(emptyListText);
    }

    this.node.append(container);
  }
}
