import BaseComponent from '../../base-component';
import Button from '../../button/button';
import List from '../../list/list';
import DetailsForm from '../../form/details-form';
import userStore from '../../../store/user-store';
import { ListDataType } from '../../../types/types';
import { AccountInfoMode } from '../../../types/enums';
import './account-details.scss';

export default class AccountDetails extends BaseComponent<'div'> {
  private mode: AccountInfoMode;
  private detailsTitle: HTMLElement;
  private detailsWrapp: HTMLElement;

  constructor(mode: AccountInfoMode, onChange: () => void = () => {}) {
    super('div', ['account-details']);

    this.mode = mode;
    this.detailsTitle = new BaseComponent('h3', ['account-details__title'], 'Account Details').getElement();
    this.detailsWrapp = new BaseComponent('div', ['account-details__wrapp']).getElement();

    this.createDetailsList(onChange);

    this.node.append(this.detailsTitle, this.detailsWrapp);
  }

  private createDetailsList(onChange: () => void = () => {}): void {
    const { customer } = userStore.getState();

    if (this.mode === AccountInfoMode.SHOW) {
      const buttonEdit = new Button(
        'button',
        'Edit account details',
        ['account-details__edit-btn'],
        false,
        onChange
      ).getElement();

      const listObj: ListDataType = {
        'First Name': customer?.firstName || '',
        'Last Name': customer?.lastName || '',
        'Birth Date': customer?.dateOfBirth || '',
        'Email ': customer?.email || '',
        'Password ': `● ● ● ● ● ● ●`,
      };

      const listOfLiElements = customer ? new List(listObj).getElement() : '';

      this.detailsWrapp.append(listOfLiElements, buttonEdit);
    } else {
      this.detailsWrapp.append(new DetailsForm(onChange).getElement());
    }
  }
}
