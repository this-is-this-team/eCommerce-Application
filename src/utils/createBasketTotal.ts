import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../components/base-component';
import formatPrice from './formatPrice';

export default function createBasketTotal(cart: Cart): HTMLDivElement {
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
