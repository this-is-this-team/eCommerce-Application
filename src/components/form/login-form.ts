import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import { ISigninData } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './form.scss';
import signinUser from '../../services/signinUser';

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
      const customer = await signinUser(values);

      console.log(customer);

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');

      // TODO: redirect to the home page
      // TODO: perform state update (add a user or his token to local storage and application storage for update header)
    } catch (error) {
      console.log(error);

      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.remove('button--success');

      // TODO: handle the errors https://github.com/orgs/this-is-this-team/projects/3/views/2?pane=issue&itemId=34789670 (use https://apvarun.github.io/toastify-js/)
    }
  }
}
