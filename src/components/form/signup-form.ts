import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import Link from '../link/link';
import { signupInputs } from '../../constants/signupInputs';
import { IAddress, ISignupData } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import signupUser from '../../services/signupUser';
import './form.scss';

interface InputFilds {
  [inputName: string]: InputField;
}

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
      street: streetShipping,
      city: cityShipping,
      postcode: postcodeShipping,
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
      street: streetBilling,
      city: cityBilling,
      postcode: postcodeBilling,
    };
  }

  private getSignupData(): ISignupData | undefined {
    const firstName: string | undefined = this.inputs['firstName'].getValue('firstName');
    const lastName: string | undefined = this.inputs['lastName'].getValue('lastName');
    const email: string | undefined = this.inputs['email'].getValue('email');
    const password: string | undefined = this.inputs['password'].getValue('password');
    const birthDate: string | undefined = this.inputs['birthDate'].getValue('birthDate');
    const shippingAddress: IAddress | undefined = this.getShippingAddress();
    const billingAddress: IAddress | undefined = this.getBillingAddress();

    if (!(firstName && lastName && email && password && birthDate && shippingAddress)) {
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
      birthDate,
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
      const customer = await signupUser(values);
      console.log(customer);

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');

      // TODO: redirect to the home page
      // TODO: perform state update (add a user or his token to local storage and application storage for update header)
    } catch (error) {
      console.error(error);

      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.remove('button--success');

      // TODO: handle the errors https://github.com/orgs/this-is-this-team/projects/3/views/2?pane=issue&itemId=34789670 (use https://apvarun.github.io/toastify-js/)
    }
  }
}
