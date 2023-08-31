import getProductById from '../../services/getProductById';
import BaseComponent from '../base-component';
import Button from '../button/button';
import './product.scss';
import { ProductData } from '@commercetools/platform-sdk';

interface ProductAttributes {
  [name: string]: string;
}

export default class Product extends BaseComponent<'div'> {
  private addToCartBtn: HTMLButtonElement;
  private productData: ProductData | null = null;
  private productAttributes: ProductAttributes = {
    rating: '-',
    reviews: '0',
    days: 'Please ask about tour duration by writing to us at this.is.this@gmail.com',
    inStock: 'Please check availability by writing to us at this.is.this@gmail.com',
    location: 'Paradise',
    shortDescription: 'No information about this tour',
    adventureStyle: 'Relax',
    aboutTour: 'No information about this tour',
  };

  constructor(id: string) {
    super('div', ['product']);

    this.addToCartBtn = new Button('submit', 'Add To Card').getElement();

    this.createMarkup(id);
  }

  async createMarkup(id: string) {
    await this.getProductData(id);
    this.getProductAttributes();

    if (this.productData) {
      const productInfo = this.drawProductInfo();
      const productForm = this.drawProductForm();
      const productAbout = this.drawProductAbout();

      this.node.append(productInfo, productForm, productAbout);
    }
  }

  private drawProductInfo() {
    console.log(this.productData);
    const title = this.productData?.name.en || 'This is the best tour in your life!';

    const { rating, reviews, inStock, shortDescription } = this.productAttributes;

    const productInfo = new BaseComponent('div', ['product__main-info']).getElement();
    const productOpinion = new BaseComponent('div', ['product__opinion']).getElement();
    const productTitle = new BaseComponent('h2', ['product__title'], title).getElement();
    const productRating = new BaseComponent('p', ['product__rating'], rating).getElement();
    const productReviews = new BaseComponent('p', ['product__reviews'], `${reviews} Reviews`).getElement();
    const productDescription = new BaseComponent('p', ['product__subtitle'], shortDescription).getElement();
    const productStock = new BaseComponent('p', ['product__stock'], `${inStock} In Stock`).getElement();

    productOpinion.append(productRating, productReviews);

    productInfo.append(productTitle, productOpinion, productDescription, productStock);

    return productInfo;
  }

  private getProductAttributes() {
    const attributes = this.productData?.masterVariant.attributes;

    if (attributes) {
      for (const key of attributes) {
        if (key.name in this.productAttributes) {
          this.productAttributes[key.name] = key.value;
        }
      }
    }
  }

  private drawProductForm() {
    const productForm = new BaseComponent('form', ['product__form']).getElement();

    productForm.append(this.addToCartBtn);

    return productForm;
  }

  private drawProductAbout() {
    const productAbout = new BaseComponent('ul', ['product__about']).getElement();

    return productAbout;
  }

  private async getProductData(id: string) {
    try {
      const product = await getProductById(id);

      this.productData = product.masterData.current;
    } catch (err) {
      console.log(err);
    }
  }
}
