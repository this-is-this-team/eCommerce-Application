import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import cartStore from '../../store/cart-store';
import addDiscountToCart from '../../services/basket/addDiscountToCart';
import Notification from '../notification/notification';
import createBasketTotal from '../../utils/createBasketTotal';
import createBasketDiscountTotal from '../../utils/createBasketDiscountTotal';
import getDiscountCode from '../../services/getDiscountCode';
import removeDiscountCart from '../../services/basket/removeDiscountCart';
import './basket-total.scss';

export default class BasketTotal extends BaseComponent<'section'> {
  private totalBox: HTMLDivElement | null = null;
  private inputPromo: InputField | null = null;
  private buttonClearDiscount: HTMLButtonElement | null = null;

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
    this.totalBox = new BaseComponent('div', ['basket-total__prices']).getElement();

    if (cart.discountCodes.length > 0) {
      this.renderTotalWithDiscount(cart);
    } else {
      this.renderTotal(cart);
    }

    content.append(promoBox, this.totalBox);
    container.append(content, button);

    this.node.append(container);
  }

  private renderPromoForm(): HTMLFormElement {
    const promoForm: HTMLFormElement = new BaseComponent('form', ['basket-total__promo']).getElement();
    this.inputPromo = new InputField('text', 'promo', 'TRAVEL2023', 'Enter Promo Code', ['basket-total__promo-input']);
    const buttonApply: HTMLButtonElement = new Button('button', 'Apply', ['basket-total__promo-button']).getElement();
    this.buttonClearDiscount = new Button(
      'button',
      '',
      ['button--trash-cart', 'basket-total__delete-promo'],
      false,
      this.onRemoveDiscount
    ).getElement();

    const onClick = () => {
      const promoFormData: FormData = new FormData(promoForm);
      const promoCode: string | undefined = promoFormData.get('promo')?.toString();

      if (promoCode) this.addPromoCodeToBasket(promoCode);
    };

    buttonApply.addEventListener('click', onClick);

    promoForm.append(this.inputPromo.getElement(), buttonApply, this.buttonClearDiscount);

    return promoForm;
  }

  private renderTotal(cart: Cart): void {
    (this.totalBox as HTMLDivElement).innerHTML = '';
    this.totalBox?.append(createBasketTotal(cart));
    this.buttonClearDiscount?.classList.add('hidden');
  }

  private async renderTotalWithDiscount(cart: Cart): Promise<void> {
    (this.totalBox as HTMLDivElement).innerHTML = '';
    this.totalBox?.append(...createBasketDiscountTotal(cart));
    const discount = await getDiscountCode();
    this.inputPromo?.setValue(discount?.code || '');
    this.buttonClearDiscount?.classList.remove('hidden');
  }

  private async addPromoCodeToBasket(promoCode: string): Promise<void> {
    try {
      const cart = await addDiscountToCart(promoCode);
      cartStore.dispatch({ type: 'UPDATE_CART', cart });
      this.renderTotalWithDiscount(cart as Cart);
      new Notification('success', 'Promo Code is successfully applied!').showNotification();
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
        if (error.message === 'invalid_token') {
          localStorage.removeItem('tokenAnon');
          localStorage.removeItem('token');
        }
      } else {
        console.error(error);
      }
    }
  }

  private onRemoveDiscount = async (): Promise<void> => {
    try {
      const cart = await removeDiscountCart();
      cartStore.dispatch({ type: 'UPDATE_CART', cart });
      this.renderTotal(cart as Cart);
      new Notification('success', 'Promo Code is successfully deleted!').showNotification();
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
        if (error.message === 'invalid_token') {
          localStorage.removeItem('tokenAnon');
          localStorage.removeItem('token');
        }
      } else {
        console.error(error);
      }
    }
  };
}
