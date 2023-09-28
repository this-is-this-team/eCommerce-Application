import { TypedMoney, type ProductProjection } from '@commercetools/platform-sdk';
import { ICategory } from '../../types/types';
import BaseComponent from '../base-component';
import Button from '../button/button';
import Link from '../link/link';
import categories from '../../constants/categories';
import subcategories from '../../constants/subcategories';
import formatPrice from '../../utils/formatPrice';
import addToCart from '../../services/basket/addToCart';
import Notification from '../notification/notification';
import cartStore from '../../store/cart-store';
import './product-card.scss';

export default class ProductCard extends BaseComponent<'div'> {
  private cartButton: HTMLButtonElement;
  private productId: string;

  constructor(product: ProductProjection) {
    super('div', ['product-card']);

    this.productId = product.id;

    this.cartButton = this.createButtonCart();

    this.createMarkup(product);
    this.addSubscribtion();
  }

  private createButtonCart(): HTMLButtonElement {
    const classes = this.isProductInCart()
      ? ['product-card__button', 'product-card__button--added', 'button--cart']
      : ['product-card__button', 'button--cart'];
    const isDisabled = this.isProductInCart();
    const button = new Button('button', '', classes, isDisabled, () => this.onAddToCart(this.productId)).getElement();

    return button;
  }

  private createMarkup(product: ProductProjection): void {
    const title: string = product.name.en;
    const description: string = product.metaDescription?.en || '';
    const image: string = product.masterVariant.images?.[0]?.url || '';
    const reviews: string = product.masterVariant.attributes?.[1]?.value || '0';
    const standardPrice: TypedMoney | undefined = product.masterVariant.prices?.[0]?.value;
    const discountedPrice: TypedMoney | undefined = product.masterVariant.prices?.[0]?.discounted?.value;
    const days: string = product.masterVariant.attributes?.[2]?.value || '';
    const rating: string = product.masterVariant.attributes?.[0]?.value || '';

    const linkToProduct = this.createLinkToProduct(product.slug.en, this.productId);

    const cardMedia = new Link('', ['product-card__media'], linkToProduct).getElement();
    const cardImage: HTMLImageElement = new BaseComponent('img', ['product-card__image']).getElement();
    const cardRating = new BaseComponent('div', ['product-card__rating'], rating).getElement();
    if (image) {
      cardImage.src = image;
      cardMedia.append(cardImage);
    } else {
      cardMedia.classList.add('product-card__media--placeholder');
    }

    const cardContent = new BaseComponent('div', ['product-card__content']).getElement();
    const cardTitle = new BaseComponent('h4', ['product-card__title'], title).getElement();
    const cardDescription = new BaseComponent('p', ['product-card__description'], description).getElement();

    const cardMiddle = new BaseComponent('div', ['product-card__middle']).getElement();
    const cardPrice = new BaseComponent('span', ['product-card__price']).getElement();
    const cardPriceDisc = new BaseComponent('span', ['product-card__price', 'product-card__price--new']).getElement();

    if (standardPrice) {
      cardPrice.textContent = formatPrice(
        standardPrice.currencyCode,
        standardPrice.centAmount,
        standardPrice.fractionDigits
      );
      cardMiddle.append(cardPrice);
    }

    if (discountedPrice) {
      cardPriceDisc.textContent = formatPrice(
        discountedPrice.currencyCode,
        discountedPrice.centAmount,
        discountedPrice.fractionDigits
      );
      cardPrice.classList.add('product-card__price--old');
      cardMiddle.append(cardPriceDisc);
    }

    const cardMiddleDivider = new BaseComponent('div', ['product-card__middle-divider'], '|').getElement();
    const cardDays = new BaseComponent('span', ['product-card__days'], `${days} days`).getElement();
    cardMiddle.append(cardMiddleDivider, cardDays);

    const cardBottom = new BaseComponent('div', ['product-card__bottom']).getElement();
    const cardReviews = new BaseComponent('p', ['product-card__reviews'], `${reviews}+ Reviews`).getElement();

    cardBottom.append(cardReviews, this.cartButton);

    cardContent.append(cardRating, cardTitle, cardDescription, cardMiddle, cardBottom);

    this.node.append(cardMedia, cardContent);
  }

  private createLinkToProduct(slug: string, id: string): string {
    const parts: string[] = slug.split('---');

    const [categorySlug, subcategorySlug] = parts;

    const currentCategory: ICategory | undefined = categories.find((item) => item.slug === categorySlug);
    const currentsubCategory: ICategory | undefined = subcategories[categorySlug]?.find(
      (item) => item.slug === subcategorySlug
    );

    if (currentCategory && !currentsubCategory) return `/shop/${categorySlug}/${id}`;
    if (!currentCategory && !currentsubCategory) return `/shop/${id}`;
    if (!currentCategory) return `/shop/${id}`;

    return `/shop/${categorySlug}/${subcategorySlug}/${id}`;
  }

  private async onAddToCart(id: string): Promise<void> {
    try {
      this.cartButton.disabled = true;
      this.node.classList.add('card-overlay-enabled');

      const cart = await addToCart(id);
      cartStore.dispatch({ type: 'UPDATE_CART', cart });
      new Notification('success', 'Tour has been successfully added to cart!').showNotification();
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }

      this.cartButton.disabled = false;
    } finally {
      this.node.classList.remove('card-overlay-enabled');
    }
  }

  private isProductInCart(): boolean {
    const { cart } = cartStore.getState();
    return !!cart?.lineItems.find((item) => item.productId === this.productId);
  }

  private addSubscribtion(): void {
    cartStore.subscribe((state) => {
      if (state.cart?.lineItems.find((item) => item.productId === this.productId)) {
        this.cartButton.classList.add('product-card__button--added');
        this.cartButton.disabled = true;
      } else {
        this.cartButton.classList.remove('product-card__button--added');
        this.cartButton.disabled = false;
      }
    });
  }
}
