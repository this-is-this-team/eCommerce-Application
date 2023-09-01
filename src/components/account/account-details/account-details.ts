import BaseComponent from '../../base-component';
import Button from '../../button/button';
import List from '../../list/list';
import userStore from '../../../store/user-store';
import { ListDataType } from '../../../types/types';

import './account-details.scss';

export default class AccountDetails extends BaseComponent<'div'> {
  private detailsTitle: HTMLElement;
  private detailsWrapp: HTMLElement;
  private buttonEdit: HTMLButtonElement;

  constructor() {
    super('div', ['account-details']);

    this.detailsTitle = new BaseComponent('h3', ['account-details__title'], 'Account Details').getElement();
    this.detailsWrapp = new BaseComponent('div', ['account-details__wrapp']).getElement();
    this.buttonEdit = new Button('button', 'Edit account details', ['account-details__edit-btn']).getElement();

    this.detailsWrapp.append(this.createDetailsList(), this.buttonEdit);

    this.node.append(this.detailsTitle, this.detailsWrapp);
  }

  private createDetailsList(): HTMLUListElement | '' {
    const { customer } = userStore.getState();

    const listObj: ListDataType = {
      'First Name': customer?.firstName || '',
      'Last Name': customer?.lastName || '',
      'Birth Date': customer?.dateOfBirth || '',
      'Email ': customer?.email || '',
      'Password ': `● ● ● ● ● ● ●`,
    };

    const listOfLiElements = customer ? new List(listObj).getElement() : '';

    return listOfLiElements;
  }
}
