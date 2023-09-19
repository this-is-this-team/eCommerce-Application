import { AppRoutesPath } from '../../router/types';
import { changeUrlEvent } from '../../utils/change-url-event';
import BaseComponent from '../base-component';
import Button from '../button/button';
import './basket-empty.scss';

export default class BasketEmpty extends BaseComponent<'section'> {
  constructor() {
    super('section', ['basket-empty']);

    this.renderBasketContent();
  }

  private renderBasketContent(): void {
    const basketEmptyContainer = new BaseComponent('div', ['basket-empty__container']).getElement();
    const basketEmptyContent = new BaseComponent('div', ['basket-empty__content']).getElement();
    const basketIcon = new BaseComponent('div', ['basket-empty__icon']).getElement();
    const contentTitle = new BaseComponent('h4', ['basket-empty__title'], 'Your Shopping Cart is Empty').getElement();

    const basketSubtitle = new BaseComponent(
      'p',
      ['basket-empty__subtitle'],
      'Looks like you haven’t added anything yet, let’s get you started!'
    ).getElement();

    const basketBtn = new Button('button', 'Start Shopping', ['basket-empty__button'], false, () =>
      changeUrlEvent(AppRoutesPath.SHOP)
    ).getElement();

    basketEmptyContent.append(basketIcon, contentTitle, basketSubtitle, basketBtn);
    basketEmptyContainer.append(basketEmptyContent);
    this.node.append(basketEmptyContainer);
  }
}
