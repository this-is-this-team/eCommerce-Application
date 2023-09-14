import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import formatPrice from '../../services/formatPrice';
import './basket-total.scss';

export default class BasketTotal extends BaseComponent<'section'> {
  constructor(cart: Cart) {
    super('section', ['basket-total']);

    this.renderSection(cart);
  }

  private renderSection(cart: Cart): void {
    const container: HTMLDivElement = new BaseComponent('div', ['basket-total__container']).getElement();
    const content: HTMLDivElement = new BaseComponent('div', ['basket-total__content']).getElement();
    const button: HTMLButtonElement = new Button(
      'button',
      'Proceed to Checkout',
      ['basket-total__button'],
      true
    ).getElement();

    const promoBox = this.renderPromoForm();
    const totalBox = this.renderTotal(cart);

    content.append(promoBox, totalBox);
    container.append(content, button);

    this.node.append(container);
  }

  private renderPromoForm(): HTMLFormElement {
    const promoForm: HTMLFormElement = new BaseComponent('form', ['basket-total__promo']).getElement();
    const inputPromo: HTMLDivElement = new InputField('text', 'promo', 'TRAVEL2023', 'Enter Promo Code', [
      'basket-total__promo-input',
    ]).getElement();
    const buttonApply: HTMLButtonElement = new Button('button', 'Apply', ['basket-total__promo-button']).getElement();

    const onClick = () => {
      const promoFormData: FormData = new FormData(promoForm);
      const promoCode: string | undefined = promoFormData.get('promo')?.toString();
      console.log(`TODO: implement in ISSUE #131, promocode: ${promoCode}`);
    };

    buttonApply.addEventListener('click', onClick);

    promoForm.append(inputPromo, buttonApply);

    return promoForm;
  }

  private renderTotal(cart: Cart): HTMLDivElement {
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
}
