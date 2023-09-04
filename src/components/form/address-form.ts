import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import SelectTypeField from '../select/select-type';
import Notification from '../notification/notification';
import addAddress from '../../services/addresses/addAddress';
import setDefaultTypeAddress from '../../services/addresses/setDefaultTypeAddress';
import addTypeAddressID from '../../services/addresses/addTypeAddressID';
import changeAddress from '../../services/addresses/changeAddress';
import { AddressInputs } from '../../constants/addressInputs';
import { IAddressData, IAddressFormData, InputFilds } from '../../types/interfaces';
import { AddressesMode } from '../../types/enums';
import './form.scss';

export default class AddressForm extends BaseComponent<'form'> {
  private inputs: InputFilds;
  private selectType: SelectTypeField;
  private isDefaultShipping: boolean;
  private isDefaultBilling: boolean;
  private buttonSubmit: HTMLButtonElement;
  private buttonCancel: HTMLButtonElement;
  private firstBtnAction: (type: AddressesMode) => void;
  private secondBtnAction: (id: string) => void;
  private addressData: IAddressData | null;

  constructor(
    firstCallback: (type: AddressesMode) => void,
    secondCallback: (id: string) => void,
    addressData: IAddressData | null = null
  ) {
    super('form', ['form__form']);
    this.inputs = {};
    this.selectType = new SelectTypeField();
    this.isDefaultShipping = false;
    this.isDefaultBilling = false;
    this.addressData = addressData;
    this.firstBtnAction = firstCallback;
    this.secondBtnAction = secondCallback;
    this.node.addEventListener('submit', (event) => this.onSubmit(event));
    this.buttonSubmit = new Button('submit', this.addressData ? 'Save Address' : 'Add Address', []).getElement();
    this.buttonCancel = new Button('button', 'Cancel', ['button--cancel'], false, () =>
      this.secondBtnAction('new')
    ).getElement();
    this.createMarkup();
  }

  private createMarkup(): void {
    const actionField: HTMLDivElement = new BaseComponent('div', ['form__action']).getElement();
    actionField.append(this.buttonSubmit, this.buttonCancel);

    const formContent: HTMLDivElement = new BaseComponent('div', ['form__content']).getElement();

    const addressMainInputs = AddressInputs['main'].map(({ type, name, placeholder, label }) => {
      const inputField = new InputField(type, name, placeholder, label);

      if (name === 'streetName') {
        inputField.setValue(this.addressData?.address.streetName || '');
      } else if (name === 'city') {
        inputField.setValue(this.addressData?.address.city || '');
      } else if (name === 'postalCode') {
        inputField.setValue(this.addressData?.address.postalCode || '');
      }

      this.inputs[name] = inputField;

      return inputField.getElement();
    });

    const addressCheckboxesInputs = AddressInputs['checkboxes'].map(({ type, name, placeholder, label }) => {
      const inputField = new InputField(type, name, placeholder, label);

      if (name === 'checkboxDefaultShipping') {
        inputField.getElement().addEventListener('change', () => {
          this.isDefaultShipping = !this.isDefaultShipping;
        });

        if (this.addressData) {
          inputField.setChecked(this.addressData?.defaultShippingAddressId === this.addressData?.address.id);
        }
      }

      if (name === 'checkboxDefaultBilling') {
        inputField.getElement().addEventListener('change', () => {
          this.isDefaultBilling = !this.isDefaultBilling;
        });

        if (this.addressData) {
          inputField.setChecked(this.addressData?.defaultBillingAddressId === this.addressData?.address.id);
        }
      }

      this.inputs[name] = inputField;

      return inputField.getElement();
    });

    const chackboxesWrapp = new BaseComponent('div', []).getElement();
    chackboxesWrapp.append(...addressCheckboxesInputs);

    formContent.append(this.selectType.getElement(), ...addressMainInputs, chackboxesWrapp);

    this.node.append(formContent, actionField);
  }

  private getSignupData(): IAddressFormData | undefined {
    const type: string | undefined = this.selectType.getValue();
    const streetName: string | undefined = this.inputs['streetName'].getValue('streetBilling');
    const city: string | undefined = this.inputs['city'].getValue('cityBilling');
    const postalCode: string | undefined = this.inputs['postalCode'].getValue('postcodeBilling');
    const country = 'US';

    if (!(type && streetName && city && postalCode && country)) {
      return;
    }

    return {
      type,
      streetName,
      city,
      postalCode,
      country,
    };
  }

  private async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.buttonSubmit.disabled = true;
    this.buttonSubmit.classList.add('button--loading');

    const values = this.getSignupData();

    if (!values) {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove('button--loading');
      return;
    }
    let addressId: string;

    try {
      if (this.addressData) {
        await changeAddress(this.addressData.address.id || '', values);
        addressId = this.addressData.address.id || '';
      } else {
        const { addresses } = await addAddress(values);
        addressId = addresses[addresses.length - 1].id || '';
      }

      if (this.isDefaultBilling) await setDefaultTypeAddress('Billing', addressId);
      if (this.isDefaultShipping) await setDefaultTypeAddress('Shhipping', addressId);

      if (values.type === 'Billing') {
        await addTypeAddressID('Billing', addressId);
      } else if (values.type === 'Shipping') {
        await addTypeAddressID('Shipping', addressId);
      } else {
        await addTypeAddressID('Billing', addressId);
        await addTypeAddressID('Shipping', addressId);
      }

      if (this.addressData?.address.id) {
        new Notification('success', 'The selected address has been successfully updated!').showNotification();
      } else {
        new Notification('success', 'Your Address is successfully added!').showNotification();
      }

      this.buttonSubmit.classList.remove('button--loading');
      this.buttonSubmit.classList.add('button--success');

      setTimeout(() => {
        this.firstBtnAction(this.addressData?.address.id ? AddressesMode.SHOW : AddressesMode.NEW);
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
