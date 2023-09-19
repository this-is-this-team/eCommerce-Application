import BaseComponent from '../base-component';
import Link from '../link/link';
import Button from '../button/button';
import userLogout from '../../services/userLogout';
import Notification from '../../components/notification/notification';
import { IBreadcrumbLink } from '../../types/interfaces';
import { changeUrlEvent } from '../../utils/change-url-event';
import { AppRoutesPath } from '../../router/types';
import './breadcrumbs.scss';

export default class Breadcrumbs extends BaseComponent<'div'> {
  constructor(links: IBreadcrumbLink[], currentPage: string, showLogoutBtn: boolean = false) {
    super('div', ['breadcrumbs']);

    this.renderBreadcrumbs(links, currentPage, showLogoutBtn);
  }

  renderBreadcrumbs(links: IBreadcrumbLink[], currentPage: string, showLogoutBtn: boolean = false): void {
    const container: HTMLDivElement = new BaseComponent('div', ['breadcrumbs__container']).getElement();
    const linksElement: HTMLDivElement = new BaseComponent('div', ['breadcrumbs__links']).getElement();
    const activeLinksElements: HTMLAnchorElement[] = links.map((link) =>
      new Link(link.pageName, ['link--breadcrumbs'], link.pageHref).getElement()
    );
    const currentPageElement: HTMLParagraphElement = new BaseComponent(
      'p',
      ['breadcrumbs__current'],
      currentPage
    ).getElement();

    linksElement.append(...activeLinksElements, currentPageElement);

    const logoutBtn = new Button('button', 'Log Out', ['button--logout'], false, () => {
      userLogout();
      changeUrlEvent(AppRoutesPath.MAIN);
      new Notification('success', 'You have successfully logged out!').showNotification();
    });

    container.append(linksElement);

    if (showLogoutBtn) container.append(logoutBtn.getElement());

    this.node.append(container);
  }
}
