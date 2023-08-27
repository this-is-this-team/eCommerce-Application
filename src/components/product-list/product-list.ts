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
    const container: HTMLDivElement = new BaseComponent<'div'>('div', ['product-list__container']).getElement();
    try {
      this.items = await getProducts();

      this.cards = this.items.map((item) => {
        const title: string = item.masterData.staged.name['en-US'];
        const description: string = item.masterData.staged.description?.['en-US'] || '';
        const image: string = item.masterData.staged.masterVariant.images?.[0]?.url || '';
        return new ProductCard(title, description, image).getElement();
      });

      console.log(this.items);
    } catch (error) {
      console.log(error);
    }

    container.append(...this.cards);
    this.node.append(container);
  }
}
