import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import signupUser from '../../services/signupUser';
import Notification from '../notification/notification';
import { signupInputs } from '../../constants/signupInputs';
import { IAddress, InputFilds, ISignupData } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import { changeUrlEvent } from '../../utils/change-url-event';
import './form.scss';

export default class SignupForm extends BaseComponent<'div'> {
  private formElement: HTMLFormElement;
  private inputs: InputFilds;
  private checkboxAddress: boolean;
  private isDefaultShipping: boolean;
  private isDefaultBilling: boolean;
  private buttonSubmit: HTMLButtonElement;

  constructor() {
    super('div', ['form']);
    this.formElement = new BaseComponent('form', ['form__form']).getElement();
    this.inputs = {};
    this.checkboxAddress = false;
    this.isDefaultShipping = false;
    this.isDefaultBilling = false;
    this.formElement.addEventListener('submit', (event) => this.onSubmit(event));
    this.buttonSubmit = new Button('submit', 'Create Account').getElement();
    this.createMarkup();
  }

  private createMarkup(): void {
    const title = 'Create Account';
    const subTitle = 'Create a new account & experience our services.';
    const formTitle: HTMLHeadElement = new BaseComponent('h2', ['form__title'], title).getElement();
    const formSubtitle: HTMLParagraphElement = new BaseComponent('p', ['form__subtitle'], subTitle).getElement();

    const actionField: HTMLDivElement = new BaseComponent('div', ['form__action']).getElement();
    const linkOnLogin: HTMLAnchorElement = new Link('Log In', ['link--arrow'], AppRoutesPath.LOGIN).getElement();
    actionField.append(this.buttonSubmit, linkOnLogin);

    const formContent: HTMLDivElement = new BaseComponent('div', ['form__content']).getElement();
    const infoInputsBlock: HTMLDivElement = new BaseComponent('div', ['form__form-block']).getElement();
    const addressesBlock: HTMLDivElement = new BaseComponent('div', ['form__form-block']).getElement();

    const infoInputs = signupInputs['infoInputs'].map(({ type, name, placeholder, label }) => {
      const inputField: InputField = new InputField(type, name, placeholder, label);
      this.inputs[name] = inputField;
      return inputField.getElement();
    });

    const addressInputs = signupInputs['addressInputs'].map(({ type, name, placeholder, label }) => {
      const inputField = new InputField(type, name, placeholder, label);

      if (name === 'checkboxAddress') {
        inputField.getElement().addEventListener('change', () => this.toggleBillingAddress());
      }

      if (name === 'checkboxDefaultShipping') {
        inputField.getElement().addEventListener('change', () => {
          this.isDefaultShipping = !this.isDefaultShipping;
        });
      }

      if (name === 'checkboxDefaultBilling') {
        inputField.getElement().addEventListener('change', () => {
          this.isDefaultBilling = !this.isDefaultBilling;
        });
      }

      this.inputs[name] = inputField;

      return inputField.getElement();
    });

    infoInputsBlock.append(...infoInputs);
    addressesBlock.append(...addressInputs);
    formContent.append(infoInputsBlock, addressesBlock);

    this.formElement.append(formContent, actionField);
    this.node.append(formTitle, formSubtitle, this.formElement);
  }

  private toggleBillingAddress() {
    this.inputs['streetBilling'].getElement().classList.toggle('form-field--hidden');
    this.inputs['cityBilling'].getElement().classList.toggle('form-field--hidden');
    this.inputs['postcodeBilling'].getElement().classList.toggle('form-field--hidden');

    this.checkboxAddress = !this.checkboxAddress;
  }

  private getShippingAddress(): IAddress | undefined {
    const streetShipping: string | undefined = this.inputs['streetShipping'].getValue('streetShipping');
    const cityShipping: string | undefined = this.inputs['cityShipping'].getValue('cityShipping');
    const postcodeShipping: string | undefined = this.inputs['postcodeShipping'].getValue('postcodeShipping');

    if (!(streetShipping && cityShipping && postcodeShipping)) {
      return;
    }

    return {
      key: 'shipping',
      country: 'US',
      streetName: streetShipping,
      city: cityShipping,
      postalCode: postcodeShipping,
    };
  }

  private getBillingAddress(): IAddress | undefined {
    const streetBilling: string | undefined = this.inputs['streetBilling'].getValue('streetBilling');
    const cityBilling: string | undefined = this.inputs['cityBilling'].getValue('cityBilling');
    const postcodeBilling: string | undefined = this.inputs['postcodeBilling'].getValue('postcodeBilling');

    if (!(streetBilling && cityBilling && postcodeBilling && !this.checkboxAddress)) {
      return;
    }

    return {
      key: 'billing',
      country: 'US',
      streetName: streetBilling,
      city: cityBilling,
      postalCode: postcodeBilling,
    };
  }

  private getSignupData(): ISignupData | undefined {
    const firstName: string | undefined = this.inputs['firstName'].getValue('firstName');
    const lastName: string | undefined = this.inputs['lastName'].getValue('lastName');
    const email: string | undefined = this.inputs['email'].getValue('email');
    const password: string | undefined = this.inputs['password'].getValue('password');
    const dateOfBirth: string | undefined = this.inputs['birthDate'].getValue('birthDate');
    const shippingAddress: IAddress | undefined = this.getShippingAddress();
    const billingAddress: IAddress | undefined = this.getBillingAddress();

    if (!(firstName && lastName && email && password && dateOfBirth && shippingAddress)) {
      return;
    }

    const addresses: IAddress[] = [shippingAddress];

    if (!this.checkboxAddress) {
      if (!billingAddress) return;
      addresses.push(billingAddress);
    }

    return {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      addresses,
      shippingAddresses: [0],
      billingAddresses: [billingAddress ? 1 : 0],
      ...(this.isDefaultShipping ? { defaultShippingAddress: 0 } : {}),
      ...(this.isDefaultBilling ? { defaultBillingAddress: billingAddress ? 1 : 0 } : {}),
    };
  }

  private async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    this.buttonSubmit.disabled = true;
    this.buttonSubmit.classList.add('button--loading');

    const values: ISignupData | undefined = this.getSignupData();

    if (!values) {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      return;
    }

    try {
      await signupUser(values);

      new Notification('success', 'Registration completed successfully').showNotification();

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');

      changeUrlEvent(AppRoutesPath.MAIN);
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
