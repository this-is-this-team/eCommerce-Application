import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../components/base-component';
import formatPrice from './formatPrice';

export default function createBasketDiscountTotal(cart: Cart): HTMLDivElement[] {
  const pricesWrapper: HTMLDivElement[] = [];

  let subTotal: number = 0;

  cart.lineItems.forEach((item) => {
    if (item.price?.discounted) {
      subTotal += item.price?.discounted.value.centAmount || 0;
    } else {
      subTotal += item.price.value.centAmount || 0;
    }
  });

  function createSubTotal(): HTMLDivElement {
    const subTotalBox: HTMLDivElement = new BaseComponent('div', ['basket-total__total']).getElement();
    const subTotalLabel: HTMLSpanElement = new BaseComponent(
      'span',
      ['basket-total__total-label'],
      'Subtotal'
    ).getElement();
    const subTotalPrice: HTMLSpanElement = new BaseComponent('span', ['basket-total__total-price']).getElement();

    if (cart.totalPrice.centAmount) {
      subTotalPrice.textContent = formatPrice(cart.totalPrice.currencyCode, subTotal, cart.totalPrice.fractionDigits);
    }

    subTotalBox.append(subTotalLabel, subTotalPrice);
    return subTotalBox;
  }

  function createDiscountTotal(): HTMLDivElement {
    const discountBox: HTMLDivElement = new BaseComponent('div', ['basket-total__total']).getElement();
    const discountLabel: HTMLSpanElement = new BaseComponent(
      'span',
      ['basket-total__total-label'],
      'Discount'
    ).getElement();
    const discountPrice: HTMLSpanElement = new BaseComponent('span', [
      'basket-total__total-price',
      'discount',
    ]).getElement();

    if (cart.totalPrice.centAmount) {
      discountPrice.textContent =
        '- ' +
        formatPrice(
          cart.totalPrice.currencyCode,
          subTotal - cart.totalPrice.centAmount,
          cart.totalPrice.fractionDigits
        );
    }

    discountBox.append(discountLabel, discountPrice);
    return discountBox;
  }

  function createTotal(): HTMLDivElement {
    const totalBox: HTMLDivElement = new BaseComponent('div', ['basket-total__total']).getElement();
    const totalLabel: HTMLSpanElement = new BaseComponent('span', ['basket-total__total-label'], 'Total').getElement();
    const totalPrice: HTMLSpanElement = new BaseComponent('span', ['basket-total__total-price']).getElement();

    if (cart.totalPrice.centAmount) {
      totalPrice.textContent = formatPrice(
        cart.totalPrice.currencyCode,
        cart.totalPrice.centAmount,
        cart.totalPrice.fractionDigits
      );
    }

    totalBox.append(totalLabel, totalPrice);
    return totalBox;
  }

  pricesWrapper.push(createSubTotal(), createDiscountTotal(), createTotal());

  return pricesWrapper;
}
