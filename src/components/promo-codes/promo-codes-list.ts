import promoCodes from '../../constants/promoCodes';
import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Notification from '../notification/notification';
import './promo-codes.scss';

export default class PromoCodesList extends BaseComponent<'ul'> {
  constructor() {
    super('ul', ['promo-codes-list']);
    this.renderPromoCodesList();
  }

  private handleCopyPromoCode(code: string): void {
    navigator.clipboard.writeText(code);
    new Notification('success', 'This Promo Code is successfully saved to clipboard!').showNotification();
  }

  private renderPromoCodesList(): void {
    promoCodes.forEach((obj) => {
      const item = new BaseComponent('li', ['promo-codes-item']).getElement();

      const firstWrapp = new BaseComponent('div', ['promo-codes-item__wrapp']).getElement();
      const itemImg = new BaseComponent('span', ['promo-codes-item__img', obj.code]).getElement();
      const itemTitle = new BaseComponent('h4', ['promo-codes-item__title'], obj.title).getElement();
      const itemDescr = new BaseComponent('h4', ['promo-codes-item__descr'], obj.descr).getElement();
      firstWrapp.append(itemImg, itemTitle, itemDescr);

      const secondWrapp = new BaseComponent('div', ['promo-codes-item__wrapp']).getElement();
      const itemActions = new BaseComponent('div', ['promo-codes-item__actions']).getElement();
      const itemInput = new InputField('text', '', '', '', ['promo-codes-item__input']);
      itemInput.setValue(obj.code);
      itemInput.setAttribute('readonly', 'readonly');
      const inputBtn = new Button('button', 'Copy', ['promo-codes-item__button'], false, () =>
        this.handleCopyPromoCode(obj.code)
      ).getElement();

      itemActions.append(itemInput.getElement(), inputBtn);

      const itemDateText = new BaseComponent(
        'p',
        ['promo-codes-item__date'],
        `Promo Code valid until ${obj.expirationDate}`
      ).getElement();

      secondWrapp.append(itemActions, itemDateText);

      item.append(firstWrapp, secondWrapp);

      this.node.append(item);
    });
  }
}
