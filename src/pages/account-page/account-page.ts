import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import AccountDetails from '../../components/account/account-details/account-details';
import AccountAddresses from '../../components/account/account-addresses/account-addresses';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './account-page.scss';
import AccountDetailsEdit from '../../components/account/account-details-edit/account-details-edit';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

enum UserProfileMode {
  EDIT = 'edit',
  SHOW = 'show',
}

export default class AccountPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private container: HTMLElement;
  private detailsSection: HTMLElement;
  private addressesSection: HTMLElement;
  private userProfileMode: UserProfileMode = UserProfileMode.SHOW;

  constructor() {
    super('div', ['account-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Account', true).getElement();
    this.container = new BaseComponent('div', ['account-page__container']).getElement();
    this.detailsSection = new BaseComponent('section', ['account-page__details']).getElement();
    this.addressesSection = new BaseComponent('section', ['account-page__addresses']).getElement();

    this.detailsSection.append(new AccountDetails(this.changeUserProfileMode).getElement());
    this.addressesSection.append(new AccountAddresses().getElement());

    this.container.append(this.detailsSection, this.addressesSection);

    this.node.append(this.breadcrumbs, this.container);
  }

  private changeUserProfileMode = (): void => {
    this.detailsSection.innerHTML = '';

    if (this.userProfileMode === UserProfileMode.SHOW) {
      this.detailsSection.append(new AccountDetailsEdit(this.changeUserProfileMode).getElement());
      this.userProfileMode = UserProfileMode.EDIT;
    } else {
      this.detailsSection.append(new AccountDetails(this.changeUserProfileMode).getElement());
      this.userProfileMode = UserProfileMode.SHOW;
    }
  };
}
