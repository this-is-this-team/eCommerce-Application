import { AppRoutesPath } from '../../router/types';
import { changeUrlEvent } from '../../utils/change-url-event';
import BaseComponent from '../base-component';
import Button from '../button/button';
import './basket-empty.scss';

export default class BasketEmpty extends BaseComponent<'div'> {
  constructor() {
    super('div', ['basket-section__content', 'basket-section__content_empty']);

    this.renderBasketContent();
  }

  private renderBasketContent(): void {
    const basketIcon = new BaseComponent('div', ['basket-section__icon']).getElement();
    const contentTitle = new BaseComponent(
      'h4',
      ['basket-section__content-title'],
      'Your Shopping Cart is Empty'
    ).getElement();

    const basketSubtitle = new BaseComponent(
      'p',
      ['basket-section__subtitle'],
      'Looks like you haven’t added anything yet, let’s get you started!'
    ).getElement();

    const basketBtn = new Button('button', 'Start Shopping', ['basket-section__button'], false, () =>
      changeUrlEvent(AppRoutesPath.SHOP)
    ).getElement();

    this.node.append(basketIcon, contentTitle, basketSubtitle, basketBtn);
  }
}
