import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import { ISigninData } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './form.scss';
import signinUser from '../../services/signinUser';
import Notification from '../notification/notification';
import { changeUrlEvent } from '../../utils/change-url-event';
import userStore from '../../store/user-store';

export default class LoginForm extends BaseComponent<'div'> {
  private formElement: HTMLFormElement;
  private emailField: InputField;
  private passwordField: InputField;
  private buttonSubmit: HTMLButtonElement;

  constructor() {
    super('div', ['form', 'form--login']);

    this.formElement = new BaseComponent('form', ['form__form']).getElement();
    this.formElement.addEventListener('submit', (event) => this.onSubmit(event));

    this.emailField = new InputField('email', 'email', 'Email', 'Email');
    this.passwordField = new InputField('password', 'password', 'Password', 'Password');
    this.buttonSubmit = new Button('submit', 'Log in').getElement();

    this.createMarkup();
  }

  private createMarkup(): void {
    const title = 'Welcome Back!';
    const subTitle = 'Log In to access your account.';
    const formTitle: HTMLHeadElement = new BaseComponent('h2', ['form__title'], title).getElement();
    const formSubtitle: HTMLParagraphElement = new BaseComponent('p', ['form__subtitle'], subTitle).getElement();

    const actionField: HTMLDivElement = new BaseComponent('div', ['form__action']).getElement();
    const linkOnLogin: HTMLAnchorElement = new Link(
      'Create Account',
      ['link--arrow'],
      AppRoutesPath.SIGN_UP
    ).getElement();

    actionField.append(this.buttonSubmit, linkOnLogin);

    const inputsBlock: HTMLDivElement = new BaseComponent('div', ['form__form-block']).getElement();

    inputsBlock.append(this.emailField.getElement(), this.passwordField.getElement());

    this.formElement.append(inputsBlock, actionField);

    this.node.append(formTitle, formSubtitle, this.formElement);
  }

  private getLoginData(): ISigninData | undefined {
    const email: string | undefined = this.emailField.getValue('email');
    const password: string | undefined = this.passwordField.getValue('password');

    if (!(email && password)) {
      return;
    }

    return {
      email,
      password,
    };
  }

  private async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.buttonSubmit.disabled = true;
    this.buttonSubmit.classList.add('button--loading');

    const values: ISigninData | undefined = this.getLoginData();

    if (!values) {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');

      return;
    }

    try {
      await signinUser(values);

      const { customer } = userStore.getState();

      const userFullName = `${customer?.firstName} ${customer?.lastName}`;

      new Notification('success', `Hello, ${userFullName}!`).showNotification();

      changeUrlEvent(AppRoutesPath.MAIN);

      this.buttonSubmit.classList.remove('button--loading');
      this.formElement.reset();
      this.buttonSubmit.disabled = false;
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }

      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
    }
  }
}
