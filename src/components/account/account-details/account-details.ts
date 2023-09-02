import './account-details.scss';
import BaseComponent from '../../base-component';
import Button from '../../button/button';
import List from '../../list/list';
import userStore from '../../../store/user-store';
import { ListDataType } from '../../../types/types';
import { UserProfileMode } from '../../../types/enums';
import DetailsForm from '../../form/details-form';
// import DetailsPasswordForm from '../../form/details-password-form';

export default class AccountDetails extends BaseComponent<'div'> {
  private mode: UserProfileMode;
  private detailsTitle: HTMLElement;
  private detailsWrapp: HTMLElement;

  constructor(mode: UserProfileMode, onChange: () => void = () => {}) {
    super('div', ['account-details']);

    this.mode = mode;
    this.detailsTitle = new BaseComponent('h3', ['account-details__title'], 'Account Details').getElement();
    this.detailsWrapp = new BaseComponent('div', ['account-details__wrapp']).getElement();

    this.createDetailsList(onChange);

    this.node.append(this.detailsTitle, this.detailsWrapp);
  }

  private createDetailsList(onChange: () => void = () => {}): void {
    const { customer } = userStore.getState();

    if (this.mode === UserProfileMode.SHOW) {
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
