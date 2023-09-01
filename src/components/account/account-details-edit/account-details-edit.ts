import './account-details-edit.scss';
import BaseComponent from '../../base-component';
import Button from '../../button/button';
import { InputFilds } from '../../../types/interfaces';
import { detailsEditInputs } from '../../../constants/detailsEditInputs';
import InputField from '../../input/input';
import userStore from '../../../store/user-store';

export default class AccountDetailsEdit extends BaseComponent<'div'> {
  private inputs: InputFilds;
  private detailsTitle: HTMLElement;
  private detailsWrapp: HTMLElement;
  private detailsForm: HTMLFormElement;
  private buttonWrapp: HTMLDivElement;
  private buttonSubmit: HTMLButtonElement;
  private buttonCancel: HTMLButtonElement;

  constructor(onChange: () => void = () => {}) {
    super('div', ['account-details']);

    this.inputs = {};
    this.detailsTitle = new BaseComponent('h3', ['account-details__title'], 'Account Details').getElement();
    this.detailsWrapp = new BaseComponent('div', ['account-details__wrapp']).getElement();
    this.detailsForm = new BaseComponent('form', ['form__form']).getElement();
    this.detailsForm.addEventListener('submit', (event) => this.onSubmit(event));
    this.buttonWrapp = new BaseComponent('div', ['form__form']).getElement();
    this.buttonSubmit = new Button('submit', 'Save account details', ['account-details__edit-btn']).getElement();
    this.buttonCancel = new Button('button', 'Cancel', ['account-details__edit-btn'], false, onChange).getElement();

    this.buttonWrapp.append(this.buttonSubmit, this.buttonCancel);

    this.createDetailsForm();

    this.detailsWrapp.append(this.detailsForm);

    this.node.append(this.detailsTitle, this.detailsWrapp);
  }

  private createDetailsForm() {
    const { customer } = userStore.getState();

    const formContent: HTMLDivElement = new BaseComponent('div', ['form__content']).getElement();
    const infoInputs = detailsEditInputs.map(({ type, name, placeholder, label }) => {
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
    this.detailsForm.append(formContent, this.buttonWrapp);
  }

  private onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}
