import BaseComponent from '../base-component';
import Button from '../button/button';
import { Price, ProductData, TypedMoney } from '@commercetools/platform-sdk';
import formatPrice from '../../services/formatPrice';
import './product.scss';
import isProductInCart from '../../services/isProductInCart';
import Notification from '../notification/notification';
import addToCart from '../../services/addToCart';
import removeProductFromCart from '../../services/removeProductFromCart';

interface ProductAttributes {
  [name: string]: string;
}

export default class Product extends BaseComponent<'div'> {
  private productForm: HTMLDivElement = new BaseComponent('div').getElement();
  private cartButton: HTMLButtonElement = new Button('button', 'Cart').getElement();
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
  private productId: string;
  private isCart: boolean = false;
  private removeFromCartBtn = new Button('button', 'Remove From Cart', ['button--white'], false, () =>
    this.onRemoveFromCart()
  ).getElement();
  private addToCartBtn = new Button('button', 'Add To Cart', [], false, () => this.onAddToCart()).getElement();

  constructor(productId: string, productData: ProductData) {
    super('div', ['product']);

    this.productData = productData;
    this.productId = productId;

    this.createMarkup();
  }

  private async createMarkup(): Promise<void> {
    this.isCart = await isProductInCart(this.productId);
    this.getProductAttributes();

    const productInfo = this.drawProductInfo();
    this.productForm = this.drawProductForm();
    const productAbout = this.drawProductAbout();

    this.node.append(productInfo, this.productForm, productAbout);
  }

  private drawProductPrice(): HTMLDivElement {
    const productPrices = new BaseComponent('div', ['product__prices']).getElement();

    const prices: Price[] | undefined = this.productData?.masterVariant.prices;

    if (prices?.length) {
      const standardPrice: TypedMoney = prices[0].value;
      const discountedPrice: TypedMoney | undefined = prices[0].discounted?.value;

      const productPrice = new BaseComponent(
        'span',
        ['product-card__price'],
        formatPrice(standardPrice.currencyCode, standardPrice.centAmount, standardPrice.fractionDigits)
      ).getElement();

      productPrices.append(productPrice);

      if (discountedPrice) {
        const productDiscountedPrice = new BaseComponent(
          'span',
          ['product-card__price', 'product-card__price--new'],
          formatPrice(discountedPrice.currencyCode, discountedPrice.centAmount, discountedPrice.fractionDigits)
        ).getElement();

        productPrice.classList.add('product-card__price--old');
        productPrices.append(productDiscountedPrice);
      }
    }

    return productPrices;
  }

  private drawProductInfo(): HTMLDivElement {
    const title = this.productData?.name.en || 'Unnamed tour';
    const { rating, reviews, inStock, shortDescription, adventureStyle } = this.productAttributes;

    const productRoutes = new BaseComponent('p', ['product__routes'], adventureStyle).getElement();
    const productInfo = new BaseComponent('div', ['product__info']).getElement();
    const productOpinion = new BaseComponent('div', ['product__opinion']).getElement();
    const productTitle = new BaseComponent('h2', ['product__title'], title).getElement();
    const productPrice = this.drawProductPrice();
    const productRating = new BaseComponent('p', ['product__rating'], rating).getElement();
    const productReviews = new BaseComponent('p', ['product__reviews'], `${reviews}+ Reviews`).getElement();
    const productDescription = new BaseComponent('p', ['product__description'], shortDescription).getElement();
    const productStock = new BaseComponent('p', ['product__stock'], `${inStock} In Stock`).getElement();

    productOpinion.append(productRating, productReviews);
    productInfo.append(productRoutes, productTitle, productPrice, productOpinion, productDescription, productStock);

    return productInfo;
  }

  private getProductAttributes(): void {
    const attributes = this.productData?.masterVariant.attributes;

    if (attributes) {
      for (const key of attributes) {
        if (key.name in this.productAttributes) {
          this.productAttributes[key.name] = key.value;
        }
      }
    }
  }

  private drawProductForm(): HTMLDivElement {
    const productForm = new BaseComponent('div', ['product__add-to-cart']).getElement();

    this.drawButton();

    productForm.append(this.cartButton);

    return productForm;
  }

  private drawButton(): void {
    if (this.isCart) {
      this.cartButton = this.removeFromCartBtn;
    } else {
      this.cartButton = this.addToCartBtn;
    }
  }

  private drawProductAbout(): HTMLUListElement {
    const { aboutTour, location } = this.productAttributes;

    const productAbout = new BaseComponent('ul', ['product__about']).getElement();
    const productAboutItem = new BaseComponent('li', ['product__about-item'], 'About Tour').getElement();
    const productLocationItem = new BaseComponent('li', ['product__about-item'], 'Location').getElement();

    aboutTour
      .slice(0, -1)
      .split('.')
      .forEach((sentence) => {
        const aboutTourSentence = new BaseComponent('p', ['product__description'], `${sentence}.`).getElement();

        productAboutItem.append(aboutTourSentence);
      });

    const productLocation = new BaseComponent('p', ['product__description'], location).getElement();

    productLocationItem.append(productLocation);
    productAbout.append(productAboutItem, productLocationItem);

    return productAbout;
  }

  private async onAddToCart(): Promise<void> {
    this.cartButton.disabled = true;
    this.node.classList.add('card-overlay-enabled');

    await addToCart(this.productId);
    new Notification('success', 'Tour has been successfully added to cart!').showNotification();

    this.cartButton = this.removeFromCartBtn;

    this.productForm.innerHTML = '';
    this.productForm.append(this.cartButton);

    this.cartButton.disabled = false;
  }

  private async onRemoveFromCart(): Promise<void> {
    this.cartButton.disabled = true;
    this.node.classList.add('card-overlay-enabled');

    await removeProductFromCart(this.productId);
    new Notification('success', 'Tour has been successfully removed from cart!').showNotification();

    this.cartButton = this.addToCartBtn;

    this.productForm.innerHTML = '';
    this.productForm.append(this.cartButton);

    this.cartButton.disabled = false;
  }
}
