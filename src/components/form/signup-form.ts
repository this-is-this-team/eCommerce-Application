import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import './form.scss';

export default class SignupForm extends BaseComponent<'div'> {
  private formElement: HTMLFormElement;
  private firstNameField: InputField;
  private lastNameField: InputField;
  private emailField: InputField;
  private passwordField: InputField;

  constructor() {
    super('div', ['form']);
    this.formElement = new BaseComponent('form', ['form__form']).getElement();

    // TODO: add fields required by the task
    this.firstNameField = new InputField('text', 'firstName', 'First Name', 'First Name');
    this.lastNameField = new InputField('text', 'lastName', 'Last Name', 'Last Name');
    this.emailField = new InputField('email', 'email', 'Email', 'Email');
    this.passwordField = new InputField('password', 'password', 'Password', 'Password');

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
      this.firstNameField.getElement(),
      this.lastNameField.getElement(),
      this.emailField.getElement(),
      this.passwordField.getElement(),
      actionField
    );

    this.node.append(formTitle, formSubtitle, this.formElement);
  }

  // TODO: describe interface of data to be sent to commerceTools
  private getValues() {
    const formData = new FormData(this.formElement);
    const firstName = formData.get('firstName')?.toString().trim() || '';
    const lastName = formData.get('lastName')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';

    if (
      !this.firstNameField.isValid('firstName', firstName) ||
      !this.lastNameField.isValid('lastName', lastName) ||
      !this.passwordField.isValid('password', password)
    ) {
      return;
    }

    return {
      firstName,
      lastName,
      email,
      password,
    };
  }

  // TODO: send to commerceTools
  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const regData = this.getValues();
    if (!regData) return;
    console.log(regData);
  }
}
