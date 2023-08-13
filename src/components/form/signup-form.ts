import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import { signupInputs } from '../../constants/signupInputs';
import { IAddress, ISignupData } from '../../types/interfaces';
import './form.scss';

interface InputFilds {
  [inputName: string]: InputField;
}

export default class SignupForm extends BaseComponent<'div'> {
  private formElement: HTMLFormElement;
  private inputs: InputFilds;
  private checkboxAddress: boolean;

  constructor() {
    super('div', ['form']);
    this.formElement = new BaseComponent('form', ['form__form']).getElement();
    this.inputs = {};
    this.checkboxAddress = false;
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

    const formContent = new BaseComponent('div', ['form__content']).getElement();
    const infoInputsBlock = new BaseComponent('div', ['form__form-block']).getElement();
    const addressesBlock = new BaseComponent('div', ['form__form-block']).getElement();

    const infoInputs = signupInputs['infoInputs'].map(({ type, name, placeholder, label }) => {
      const inputField = new InputField(type, name, placeholder, label);
      this.inputs[name] = inputField;
      return inputField.getElement();
    });

    const addressInputs = signupInputs['addressInputs'].map(({ type, name, placeholder, label }) => {
      const inputField = new InputField(type, name, placeholder, label);

      if (name === 'checkboxAddress') {
        inputField.getElement().addEventListener('change', () => this.toggleBillingAddress());
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
    const streetShipping = this.inputs['streetShipping'].getValue('streetShipping');
    const cityShipping = this.inputs['cityShipping'].getValue('cityShipping');
    const postcodeShipping = this.inputs['postcodeShipping'].getValue('postcodeShipping');

    if (!(streetShipping && cityShipping && postcodeShipping)) {
      return;
    }

    return {
      key: 'shipping',
      country: 'US',
      street: streetShipping,
      city: cityShipping,
      postcode: postcodeShipping,
    };
  }

  private getBillingAddress(): IAddress | undefined {
    const streetBilling = this.inputs['streetBilling'].getValue('streetBilling');
    const cityBilling = this.inputs['cityBilling'].getValue('cityBilling');
    const postcodeBilling = this.inputs['postcodeBilling'].getValue('postcodeBilling');

    if (!(streetBilling && cityBilling && postcodeBilling && !this.checkboxAddress)) {
      return;
    }

    return {
      key: 'billing',
      country: 'US',
      street: streetBilling,
      city: cityBilling,
      postcode: postcodeBilling,
    };
  }

  private getSignupData(): ISignupData | undefined {
    const firstName = this.inputs['firstName'].getValue('firstName');
    const lastName = this.inputs['lastName'].getValue('lastName');
    const email = this.inputs['email'].getValue('email');
    const password = this.inputs['password'].getValue('password');
    const birthDate = this.inputs['birthDate'].getValue('birthDate');
    const shippingAddress = this.getShippingAddress();
    const billingAddress = this.getBillingAddress();

    if (!(firstName && lastName && email && password && birthDate && shippingAddress)) {
      return;
    }

    const addresses: IAddress[] = [shippingAddress];
    if (billingAddress) addresses.push(billingAddress);

    return {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      addresses,
    };
  }

  // TODO: send to commerceTools
  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const values = this.getSignupData();
    if (!values) {
      console.log('incorrect values');
      return;
    }
    console.log(values);
  }
}
