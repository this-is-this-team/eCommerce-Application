import BaseComponent from '../base-component';
import Link from '../link/link';
import { IBreadcrumbLink } from '../../types/interfaces';
import './breadcrumbs.scss';

export default class Breadcrumbs extends BaseComponent<'div'> {
  constructor(links: IBreadcrumbLink[], currentPage: string) {
    super('div', ['breadcrumbs']);

    this.renderBreadcrumbs(links, currentPage);
  }

  renderBreadcrumbs(links: IBreadcrumbLink[], currentPage: string) {
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

    container.append(linksElement);

    this.node.append(container);
  }
}
