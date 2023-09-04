import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Link from '../../components/link/link';
import Button from '../../components/button/button';
import Address from '../../components/address/address';
import Notification from '../../components/notification/notification';
import userStore from '../../store/user-store';
import { IAddressData, IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import { AddressesMode } from '../../types/enums';
import removeAddress from '../../services/addresses/removeAddress';
import changeVisibleAddressesBtns from '../../utils/change-visible-addresses-btns';
import './addresses-page.scss';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
  {
    pageName: 'Account',
    pageHref: AppRoutesPath.ACCOUNT,
  },
];

export default class AddressesPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private container: HTMLElement;
  private addressesSection: HTMLElement;
  private addressesListWrapp: HTMLElement;
  private addresses: HTMLDivElement[] = [];

  private addNewAddressBtn: HTMLButtonElement | null = null;

  constructor() {
    super('div', ['addresses-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Addresses').getElement();
    this.container = new BaseComponent('div', ['addresses-page__container']).getElement();
    this.addressesSection = new BaseComponent('section', ['addresses-page__section']).getElement();
    this.addressesListWrapp = new BaseComponent('div', ['addresses-page__list']).getElement();
    this.addressesSection.append(this.addressesListWrapp);

    this.container.append(this.addressesSection);

    this.renderAddressesSection();
    this.renderAddressesList();

    this.node.append(this.breadcrumbs, this.container);
  }

  private renderAddressesSection = (): void => {
    const titleWrapp = new BaseComponent('div', ['addresses-page__title-wrapp']).getElement();
    const sectionTitle = new BaseComponent('h1', ['addresses-page__title'], 'Addresses').getElement();
    const returnToAccountLink = new Link('Return To Account', ['link--return'], AppRoutesPath.ACCOUNT).getElement();
    this.addNewAddressBtn = new Button(
      'button',
      '+ Add New Address',
      ['button--add-address', 'addresses-page__add-btn'],
      false,
      this.renderNewAddressForm
    ).getElement();

    titleWrapp.append(sectionTitle, returnToAccountLink);

    this.addressesSection.prepend(titleWrapp, this.addNewAddressBtn);
  };

  private renderAddressesList = (): void => {
    const { customer } = userStore.getState();

    this.addressesListWrapp.innerHTML = '';

    if (customer && customer?.addresses.length > 0) {
      customer?.addresses.forEach((item) => {
        const obj: IAddressData = {
          address: item,
          billingAddressIds: customer.billingAddressIds,
          shippingAddressIds: customer.shippingAddressIds,
          defaultBillingAddressId: customer.defaultBillingAddressId,
          defaultShippingAddressId: customer.defaultShippingAddressId,
        };

        const address = new Address(
          AddressesMode.SHOW,
          obj,
          () => console.log('hi'),
          (id: string) => this.onDeleteAddress(id)
        ).getElement();
        this.addressesListWrapp.append(address);
        this.addresses.push(address);
      });
    }
  };

  private renderNewAddressForm = (): void => {
    const newAddress = new Address(AddressesMode.NEW, null, this.onSubmitNewForm, (id: string) =>
      this.onCancelNewForm(id)
    ).getElement();
    this.addressesListWrapp.prepend(newAddress);
    this.addNewAddressBtn?.classList.add('hidden');

    changeVisibleAddressesBtns(this.addresses, true);
  };

  private onSubmitNewForm = (): void => {
    this.onCancelNewForm('new');
    this.renderAddressesList();
  };

  private onCancelNewForm = (id: string): void => {
    if (id === 'new') {
      this.addNewAddressBtn?.classList.remove('hidden');
      this.addressesListWrapp?.firstChild?.remove();
      changeVisibleAddressesBtns(this.addresses, false);
    }
  };

  private onDeleteAddress = async (id: string): Promise<void> => {
    try {
      await removeAddress(id);

      new Notification('success', 'The selected address was successfully deleted!').showNotification();
      this.renderAddressesList();
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }
    }
  };
}
