import BaseComponent from '../../base-component';
import userStore from '../../../store/user-store';
import Button from '../../button/button';
import { changeUrlEvent } from '../../../utils/change-url-event';
import './account-addresses.scss';
import { AppRoutesPath } from '../../../router/types';
import Sup from '../../sup/sup';

export default class AccountAddresses extends BaseComponent<'div'> {
  private detailsTitle: HTMLElement;

  constructor() {
    super('div', ['account-addresses']);

    this.detailsTitle = new BaseComponent('h3', ['account-addresses__title'], 'Address Book').getElement();

    this.node.append(this.detailsTitle, this.addressBookInfo());
  }

  private addressBookInfo(): HTMLElement {
    const { customer } = userStore.getState();

    const defaultBillingAddressId = customer?.defaultBillingAddressId;
    const defaultShippingAddressId = customer?.defaultShippingAddressId;

    const addressesWrapp = new BaseComponent('div', ['account-addresses__wrapp']).getElement();

    if (customer && customer?.addresses.length > 0) {
      customer?.addresses.forEach((address) => {
        const addressElementText = `${address.streetName}, ${address.city}, ${address.postalCode} ${address.country}`;
        const addressElement = new BaseComponent('p', ['account-addresses__item'], addressElementText).getElement();

        if (address.id === defaultBillingAddressId) {
          addressElement.append(new Sup('Default Billing').getElement());
        }
        if (address.id === defaultShippingAddressId) {
          addressElement.append(new Sup('Default Shipping').getElement());
        }

        addressesWrapp.append(addressElement);
      });

      const viewAddressesBtn = new Button(
        'button',
        `View Addresses (${customer.addresses.length})`,
        ['account-addresses__view-btn'],
        false,
        () => changeUrlEvent(AppRoutesPath.ACCOUNT_ADDRESSES)
      ).getElement();

      addressesWrapp.append(viewAddressesBtn);
    } else {
      const addressEmptyImg = new BaseComponent('span', ['account-addresses-empty__img']).getElement();
      const addressEmptyTitle = new BaseComponent(
        'h4',
        ['account-addresses-empty__title'],
        'Your Address Book is Empty'
      ).getElement();
      const addressEmptyDescr = new BaseComponent(
        'p',
        ['account-addresses-empty__descr'],
        'Investor focus research & development value proposition graphical user interface investor. '
      ).getElement();

      const addAddressesBtn = new Button('button', `Add Address`, ['account-addresses__add-btn'], false, () =>
        changeUrlEvent(AppRoutesPath.ACCOUNT_ADDRESSES)
      ).getElement();

      addressesWrapp.classList.add('centered');
      addressesWrapp.append(addressEmptyImg, addressEmptyTitle, addressEmptyDescr, addAddressesBtn);
    }

    return addressesWrapp;
  }
}
