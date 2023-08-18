import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import { ISigninData } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './form.scss';

export default class LoginForm extends BaseComponent<'div'> {
  private formElement: HTMLFormElement;
  private emailField: InputField;
  private passwordField: InputField;

  constructor() {
    super('div', ['form', 'form--login']);

    this.formElement = new BaseComponent('form', ['form__form']).getElement();
    this.formElement.addEventListener('submit', (event) => this.onSubmit(event));

    this.emailField = new InputField('email', 'email', 'Email', 'Email');
    this.passwordField = new InputField('password', 'password', 'Password', 'Password');

    this.createMarkup();
  }

  private createMarkup(): void {
    const title = 'Welcome Back!';
    const subTitle = 'Log In to access your account.';
    const formTitle: HTMLHeadElement = new BaseComponent('h2', ['form__title'], title).getElement();
    const formSubtitle: HTMLParagraphElement = new BaseComponent('p', ['form__subtitle'], subTitle).getElement();

    const actionField: HTMLDivElement = new BaseComponent('div', ['form__action']).getElement();
    const buttonSubmit: HTMLButtonElement = new Button('submit', 'Log in').getElement();
    const linkOnLogin: HTMLAnchorElement = new Link(
      'Create Account',
      ['link--arrow'],
      AppRoutesPath.SIGN_UP
    ).getElement();

    actionField.append(buttonSubmit, linkOnLogin);

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

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const values: ISigninData | undefined = this.getLoginData();

    if (!values) {
      console.log('incorrect values');
      return;
    }

    console.log(values);
  }
}
