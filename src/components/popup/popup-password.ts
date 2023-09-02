import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Notification from '../notification/notification';
import changePassword from '../../services/changePassword';
import signinUser from '../../services/signinUser';
import userStore from '../../store/user-store';
import { detailsEditInputs } from '../../constants/detailsEditInputs';
import { IDetailsPasswordData, InputFilds } from '../../types/interfaces';
import './popup.scss';

export default class PopupPassword extends BaseComponent<'div'> {
  private inputs: InputFilds = {};
  private formElement: HTMLFormElement;
  private buttonWrapp: HTMLDivElement;
  private buttonSubmit: HTMLButtonElement;
  private buttonCancel: HTMLButtonElement;
  private onCloseCallback: () => void;

  constructor(onClose: () => void = () => {}) {
    super('div', ['popup', 'open', 'popup-password']);
    this.formElement = new BaseComponent('form', ['form__form']).getElement();
    this.formElement.addEventListener('submit', (event) => this.onSubmit(event));
    this.buttonWrapp = new BaseComponent('div', ['form__action']).getElement();
    this.buttonSubmit = new Button('submit', 'Save password', []).getElement();
    this.buttonCancel = new Button('button', 'Cancel', ['button--cancel'], false, this.closePopup).getElement();
    this.buttonWrapp.append(this.buttonSubmit, this.buttonCancel);
    this.formElement.append(this.buttonWrapp);

    const popupWrapp = new BaseComponent('div', ['popup__content']).getElement();
    const popupCloseIcon = new BaseComponent('div', ['popup__close']).getElement();
    popupCloseIcon.addEventListener('click', this.closePopup);
    const popupCloseTitle = new BaseComponent('h2', ['popup__title'], 'Create new password').getElement();
    popupWrapp.append(popupCloseIcon, popupCloseTitle, this.formElement);

    this.createPasswordForm();

    this.onCloseCallback = onClose;

    this.node.append(popupWrapp);
    this.node.addEventListener('click', this.closeOnBackDropClick);
  }

  private closePopup = (): void => {
    this.node.classList.remove('open');
    this.onCloseCallback();
  };

  private closeOnBackDropClick = (e: MouseEvent): void => {
    const dialogElement = e.currentTarget;
    const isClickedOnBackDrop = e.target === dialogElement;
    if (isClickedOnBackDrop) {
      this.closePopup();
    }
  };

  private createPasswordForm(): void {
    const formContent: HTMLDivElement = new BaseComponent('div', ['form--password']).getElement();
    const infoInputs = detailsEditInputs.passwords.map(({ type, name, placeholder, label }) => {
      const inputField: InputField = new InputField(type, name, placeholder, label);
      this.inputs[name] = inputField;
      return inputField.getElement();
    });
    formContent.append(...infoInputs);
    this.formElement.prepend(formContent);
  }

  private getDetailsData(): IDetailsPasswordData | undefined {
    const currentPassword: string | undefined = this.inputs['currentPassword'].getValue('password');
    const newPassword: string | undefined = this.inputs['newPassword'].getValue('newPassword', currentPassword);

    if (!(currentPassword && newPassword)) {
      return;
    }

    return {
      currentPassword,
      newPassword,
    };
  }

  private async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.buttonSubmit.disabled = true;
    this.buttonSubmit.classList.add('button--loading');

    const values: IDetailsPasswordData | undefined = this.getDetailsData();

    if (!values) {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      return;
    }

    try {
      const { customer } = userStore.getState();

      await changePassword(values.currentPassword, values.newPassword);

      await signinUser({ email: customer?.email || '', password: values.newPassword });

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');
      new Notification('success', 'New password successfully updated!').showNotification();

      setTimeout(() => {
        this.closePopup();
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
