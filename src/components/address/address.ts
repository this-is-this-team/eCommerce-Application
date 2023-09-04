import BaseComponent from '../base-component';
import List from '../list/list';
import Button from '../button/button';
import Sup from '../sup/sup';
import AddressForm from '../form/address-form';
import { AddressesMode } from '../../types/enums';
import { IAddressData } from '../../types/interfaces';
import './address.scss';

export default class Address extends BaseComponent<'div'> {
  private mode: AddressesMode;
  private addressData: IAddressData | null;
  private firstBtnAction: () => void;
  private secondBtnAction: (id: string) => void;

  constructor(
    mode: AddressesMode,
    addressData: IAddressData | null,
    firstCallback: () => void,
    secondCallback: (id: string) => void
  ) {
    super('div', ['address']);

    this.mode = mode;
    this.addressData = addressData;
    this.firstBtnAction = firstCallback;
    this.secondBtnAction = secondCallback;

    if (mode === AddressesMode.NEW) {
      this.renderNewAddress();
    } else {
      this.renderAddress();
    }
  }

  private renderNewAddress = (): void => {
    const form = new AddressForm(this.firstBtnAction, this.secondBtnAction).getElement();
    this.node.append(form);
  };

  private renderAddress = (): void => {
    const data = this.addressData;

    if (this.mode === AddressesMode.SHOW) {
      const defaultsWrapp = new BaseComponent('div', ['address__sups']).getElement();

      if (data?.defaultBillingAddressId || data?.defaultShippingAddressId) {
        const defaultBilling =
          data?.defaultBillingAddressId === data?.address.id ? new Sup('Default Billing').getElement() : '';
        const defaultShipping =
          data?.defaultShippingAddressId === data?.address.id ? new Sup('Default Shipping').getElement() : '';

        defaultsWrapp.append(defaultBilling, defaultShipping);
      }

      const listObj = {
        'Type ': `${data?.billingAddressIds?.includes(data?.address.id || '') ? 'Billing' : ''}${
          data?.shippingAddressIds?.includes(data?.address.id || '') ? 'Shipping' : ''
        }`,
        'Street ': data?.address?.streetName || '',
        'City ': data?.address?.city || '',
        'Postcode ': data?.address?.postalCode || '',
        'Country ': data?.address?.country || '',
      };

      const list = new List(listObj).getElement();

      const buttonWrapp = new BaseComponent('div', ['address__actions']).getElement();
      const buttonSubmit = new Button('submit', 'Edit Address').getElement();
      const buttonCancel = new Button('button', 'Remove Address', ['button--cancel'], false, () =>
        this.secondBtnAction(data?.address?.id || '')
      ).getElement();

      buttonWrapp.append(buttonSubmit, buttonCancel);

      if (defaultsWrapp.childElementCount > 0) this.node.append(defaultsWrapp);

      this.node.append(list, buttonWrapp);
    }
  };
}
