import getProductById from '../../services/getProductById';
import BaseComponent from '../base-component';
import Button from '../button/button';
import './product.scss';
import { ProductData } from '@commercetools/platform-sdk';

export default class ProductS extends BaseComponent<'div'> {
  private addToCartBtn: HTMLButtonElement;
  private productData: ProductData | null;

  constructor(id: string) {
    super('div', ['product']);

    this.productData = null;
    this.addToCartBtn = new Button('submit', 'Add To Card').getElement();

    this.createMarkup(id);
  }

  async createMarkup(id: string) {
    await this.getProductData(id);

    if (this.productData) {
      const productInfo = this.drawProductInfo();
      const productForm = this.drawProductForm();
      const productAbout = this.drawProductAbout();

      this.node.append(productInfo, productForm, productAbout);
    }
  }

  private drawProductInfo() {
    const productInfo = new BaseComponent('div', ['product__main-info']).getElement();

    return productInfo;
  }

  private drawProductForm() {
    const productForm = new BaseComponent('form', ['product__form']).getElement();

    productForm.append(this.addToCartBtn);

    return productForm;
  }

  private drawProductAbout() {
    const productAbout = new BaseComponent('div', ['product__about']).getElement();

    return productAbout;
  }

  private async getProductData(id: string) {
    try {
      console.log(id);
      const product = await getProductById(id);

      this.productData = product.masterData.current;
    } catch (err) {
      console.log(err);
    }
  }
}
