import BaseComponent from '../base-component';
import PromoCodesList from './promo-codes-list';
import './promo-codes.scss';

export default class PromoCodes extends BaseComponent<'section'> {
  constructor() {
    super('section', ['promo-codes']);
    this.renderPromoCodes();
  }

  private renderPromoCodes(): void {
    const container = new BaseComponent('div', ['promo-codes__container']).getElement();
    const title = new BaseComponent(
      'h2',
      ['promo-codes__title'],
      'Your Passport to Savings: Travel Promo Deals'
    ).getElement();
    const list = new PromoCodesList().getElement();

    container.append(title, list);

    this.node.append(container);
  }
}
