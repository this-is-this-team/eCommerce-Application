import { Product, ProductData } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import './product-card.scss';
import Button from '../button/button';

export default class ProductCard extends BaseComponent<'div'> {
  constructor(product: Product) {
    super('div', ['product-card']);

    this.createMarkup(product);
  }

  private createMarkup(product: Product) {
    const productId: string = product.id;
    const productData: ProductData = product.masterData.current;
    const title: string = productData.name.en;
    const description: string = productData.metaDescription?.en || '';
    const image: string = productData.masterVariant.images?.[0]?.url || '';
    const reviews: string = productData.masterVariant.attributes?.[1]?.value || '0';
    const price: number | undefined = productData.masterVariant.prices?.[0]?.value?.centAmount;
    const priceDisc: number | undefined = productData.masterVariant.prices?.[0]?.discounted?.value.centAmount;
    const days: string = productData.masterVariant.attributes?.[2]?.value || '';
    const rating: string = productData.masterVariant.attributes?.[0]?.value || '';

    const cardMedia = new BaseComponent('div', ['product-card__media']).getElement();
    const cardImage: HTMLImageElement = new BaseComponent('img', ['product-card__image']).getElement();
    const cardRating = new BaseComponent('div', ['product-card__rating'], rating).getElement();
    if (image) {
      cardImage.src = image;
      cardMedia.append(cardImage);
    } else {
      cardMedia.classList.add('product-card__media--placeholder');
    }

    // TODO: insert callback for redirect
    cardMedia.addEventListener('click', () => {
      console.log(productId);
    });

    const cardContent = new BaseComponent('div', ['product-card__content']).getElement();
    const cardTitle = new BaseComponent('h4', ['product-card__title'], title).getElement();
    const cardDescription = new BaseComponent('p', ['product-card__description'], description).getElement();

    const cardMiddle = new BaseComponent('div', ['product-card__middle']).getElement();
    const cardPrice = new BaseComponent('span', ['product-card__price']).getElement();
    const cardPriceDisc = new BaseComponent('span', ['product-card__price--new']).getElement();

    if (price) {
      cardPrice.textContent = `$${(price / 100).toString()}`;
      cardMiddle.append(cardPrice);
    }

    if (priceDisc) {
      cardPriceDisc.textContent = `$${(priceDisc / 100).toString()}`;
      cardPrice.classList.add('product-card__price--old');
      cardMiddle.append(cardPriceDisc);
    }

    const cardMiddleDivider = new BaseComponent('div', ['product-card__middle-divider'], '|').getElement();
    const cardDays = new BaseComponent('span', ['product-card__days'], `${days} days`).getElement();
    cardMiddle.append(cardMiddleDivider, cardDays);

    const cardBottom = new BaseComponent('div', ['product-card__bottom']).getElement();
    const cardReviews = new BaseComponent('p', ['product-card__reviews'], `${reviews}+ Reviews`).getElement();
    // TODO: insert as last argument to cartButton callback for add to cart
    const cartButton = new Button('button', '', ['product-card__button', 'button--cart']).getElement();
    cardBottom.append(cardReviews, cartButton);

    cardContent.append(cardRating, cardTitle, cardDescription, cardMiddle, cardBottom);

    this.node.append(cardMedia, cardContent);
  }
}
