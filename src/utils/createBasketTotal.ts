import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../components/base-component';
import formatPrice from './formatPrice';

export default function createBasketTotal(cart: Cart): HTMLDivElement[] {
  const pricesWrapper: HTMLDivElement[] = [];

  let subTotal: number = 0;

  cart.lineItems.forEach((item) => {
    subTotal += item.price.value.centAmount * item.quantity || 0;
  });

  function createSubTotal(): HTMLDivElement {
    const subTotalBox: HTMLDivElement = new BaseComponent('div', ['basket-total__total']).getElement();
    const subTotalLabel: HTMLSpanElement = new BaseComponent(
      'span',
      ['basket-total__total-label'],
      'Subtotal'
    ).getElement();
    const subTotalPrice = new BaseComponent('span', ['basket-total__total-price']).getElement();

    subTotalPrice.textContent = formatPrice('USD', subTotal, 2);

    subTotalBox.append(subTotalLabel, subTotalPrice);
    return subTotalBox;
  }

  function createTotal(): HTMLDivElement {
    const totalBox: HTMLDivElement = new BaseComponent('div', ['basket-total__total']).getElement();
    const totalLabel: HTMLSpanElement = new BaseComponent('span', ['basket-total__total-label'], 'Total').getElement();
    const totalPrice = new BaseComponent('span', ['basket-total__total-price']).getElement();

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

  if (subTotal !== cart.totalPrice.centAmount) {
    pricesWrapper.push(createSubTotal());
  }

  pricesWrapper.push(createTotal());

  return pricesWrapper;
}
