import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Notification from '../notification/notification';
import PopupPassword from '../popup/popup-password';
import updateUser from '../../services/updateUser';
import userStore from '../../store/user-store';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { detailsEditInputs } from '../../constants/detailsEditInputs';
import { IDetailsData, InputFilds } from '../../types/interfaces';
import { removePopupFromBody } from '../../utils/remove-popup';
import './form.scss';

export default class DetailsForm extends BaseComponent<'form'> {
  private inputs: InputFilds;
  private buttonWrapp: HTMLDivElement;
  private buttonChangePassword: HTMLButtonElement;
  private buttonSubmit: HTMLButtonElement;
  private buttonCancel: HTMLButtonElement;
  private onChangeModeCallback: () => void;

  constructor(onChange: () => void = () => {}) {
    super('form', ['form__form']);
    this.inputs = {};
    this.buttonWrapp = new BaseComponent('div', ['form__action']).getElement();
    this.buttonSubmit = new Button('submit', 'Save account details', []).getElement();
    this.buttonCancel = new Button('button', 'Cancel', ['button--cancel'], false, onChange).getElement();
    this.buttonChangePassword = new Button('button', 'Change password?', ['button--change-password'], false, () => {
      document.body.append(new PopupPassword(() => removePopupFromBody('.popup-password')).getElement());
    }).getElement();

    this.buttonWrapp.append(this.buttonSubmit, this.buttonCancel);

    this.createDetailsForm();

    this.onChangeModeCallback = onChange;

    this.node.append(this.buttonChangePassword, this.buttonWrapp);
    this.node.addEventListener('submit', (event) => this.onSubmit(event));
  }

  private createDetailsForm(): void {
    const { customer } = userStore.getState();

    const formContent: HTMLDivElement = new BaseComponent('div', [
      'form__content',
      'form--details__content',
    ]).getElement();

    const infoInputs = detailsEditInputs.main.map(({ type, name, placeholder, label }) => {
      const inputField: InputField = new InputField(type, name, placeholder, label);
      if (name === 'firstName') {
        inputField.setValue(customer?.firstName || '');
      } else if (name === 'lastName') {
        inputField.setValue(customer?.lastName || '');
      } else if (name === 'dateOfBirth') {
        inputField.setValue(customer?.dateOfBirth || '');
      } else if (name === 'email') {
        inputField.setValue(customer?.email || '');
      }
      this.inputs[name] = inputField;
      return inputField.getElement();
    });

    formContent.append(...infoInputs);
    this.node.append(formContent);
  }

  private getDetailsData(): IDetailsData | undefined {
    const firstName: string | undefined = this.inputs['firstName'].getValue('firstName');
    const lastName: string | undefined = this.inputs['lastName'].getValue('lastName');
    const email: string | undefined = this.inputs['email'].getValue('email');
    const dateOfBirth: string | undefined = this.inputs['dateOfBirth'].getValue('birthDate');

    if (!(firstName && lastName && email && dateOfBirth)) {
      return;
    }

    return {
      firstName,
      lastName,
      email,
      dateOfBirth,
    };
  }

  private async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.buttonSubmit.disabled = true;
    this.buttonSubmit.classList.add('button--loading');

    const values: IDetailsData | undefined = this.getDetailsData();

    if (!values) {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');

      return;
    }

    try {
      const body: MyCustomerUpdateAction[] = [
        {
          action: 'setFirstName',
          firstName: values.firstName,
        },
        {
          action: 'setLastName',
          lastName: values.lastName,
        },
        {
          action: 'changeEmail',
          email: values.email,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: values.dateOfBirth,
        },
      ];
      await updateUser(body);

      new Notification('success', 'Account details is successfully updated!').showNotification();

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');

      setTimeout(() => {
        this.onChangeModeCallback();
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }

      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.remove('button--success');
    }
  }
}
