import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import './form.scss';

export default class SignupForm extends BaseComponent {
  private formElement: HTMLFormElement;
  private inputFieldFirstName: HTMLElement;
  private inputFieldLastName: HTMLElement;
  private inputFieldEmail: HTMLElement;
  private inputFieldPassword: HTMLElement;

  constructor() {
    super('div', ['form']);
    this.formElement = new BaseComponent('form', ['form__form']).getElement() as HTMLFormElement;

    this.inputFieldFirstName = new InputField('text', 'firstName', 'First Name', 'First Name').getElement();
    this.inputFieldLastName = new InputField('text', 'lastName', 'Last Name', 'Last Name').getElement();
    this.inputFieldEmail = new InputField('email', 'email', 'Email', 'Email').getElement();
    this.inputFieldPassword = new InputField('password', 'password', 'Password', 'Password').getElement();

    this.formElement.addEventListener('submit', (event) => this.onSubmit(event));

    this.createMarkup();
  }

  private createMarkup(): void {
    const title = 'Create Account';
    const subTitle = 'Create a new account & experience our services.';
    const formTitle = new BaseComponent('h2', ['form__title'], title).getElement();
    const formSubtitle = new BaseComponent('p', ['form__subtitle'], subTitle).getElement();

    const actionField = new BaseComponent('div', ['form__action']).getElement();
    const buttonSubmit = new Button('submit', 'Create Account').getElement();
    const linkOnLogin = new Link('Log In', ['link--arrow'], '#login').getElement();
    actionField.append(buttonSubmit, linkOnLogin);

    this.formElement.append(
      this.inputFieldFirstName,
      this.inputFieldLastName,
      this.inputFieldEmail,
      this.inputFieldPassword,
      actionField
    );

    this.node.append(formTitle, formSubtitle, this.formElement);
  }

  private getValues() {
    const formData = new FormData(this.formElement);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    return {
      firstName,
      lastName,
      email,
      password,
    };
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const regData = this.getValues();
    console.log(regData);
  }
}
